<template>
    <!-- 分類 -->
    <nav class="navbar navbar-expand-lg navbar-light justify-content-center border border-start-0 border-end-0 border-top border-bottom">
      <div class="navbar-nav flex-row overflow-auto navbar-custom-scroll">
        <router-link class="nav-item nav-link text-nowrap px-2" to="/products">全部商品</router-link>
        <router-link class="nav-item nav-link text-nowrap px-2" to="/favorites">關注清單</router-link>
      </div>
    </nav>
    <div class="container mt-md-5 mt-3 mb-7" style="min-height: 100vh">
      <div class="row">
        <!-- 沒關注的商品的話 -->
        <div v-if="favorite.length === 0"  class="d-flex justify-content-center my-5">
          <div class="col-md-6 card text-center" style="">
            <div class="card-body">
              <strong ><p class="m-0 text-primary" style="font-size: 2rem;">目前沒有關注的商品哦</p></strong>
              <router-link to="/products">
              <button type="button" class="col-4 btn btn-outline-primary mt-2">前去逛逛</button>
              </router-link>
            </div>
          </div>
        </div>

        <div class="col-md-4 col-lg-3" v-for="item in products" :key="item.id" >
            <div class="card border-0 mb-4 position-relative">
              <!-- 我的最愛 icon -->
              <!-- 判定是否在 favor 裡面 -->
              <i v-if="favorite.includes(item.product.id)" @click="toggleFavorite(item.product.id)" class="bi bi-heart-fill position-absolute btn btn-lg" style="right: 3px; top: 3px; color:red;"></i>
              <i v-else @click="toggleFavorite(item.product.id)" class="bi bi-suit-heart position-absolute btn btn-lg" style="right: 3px; top: 3px; color:red;"></i>

              <router-link style="text-decoration:none;" :to="`/product/${item.product.id}`">
              <div :style="{backgroundImage: `url(${item.product.imageUrl})`}"
              style="height: 325px; background-size: cover; background-position:center center">
              </div>
              <!-- 商品單向頁面 ${id} -->
              </router-link>
              <!-- 商品資料 -->
              <div class="card-body p-0">
                <h4 class="mb-0 mt-3">
                  <!-- text-decoration:none; 去除底線 -->
                  <router-link class="card-text text-muted" :to="`/product/${item.product.id}`" style="text-decoration:none;">
                    <!-- 限制title size得用p、英文字跟中文 rem不太一樣、滑鼠hover顏色 -->
                    <p class="fs-6 m-0" style="height: 3rem; overflow:hidden;" onmouseover="this.style.color='#B08968';" onmouseout="this.style.color='';">{{item.product.title}}</p>
                  </router-link>
                </h4>
                <p class="card-text text-muted mb-0" style="height: 4.5rem; overflow:hidden;">{{item.product.description}}</p>
                <button @click.prevent="addToCart(item.product)" type="button" class="btn btn-secondary position-absolute bottom-0 start-0 mb-2">加入購物車</button>
                <p class="mb-0 text-muted text-end mt-2"><del>NT$ {{ item.product.origin_price }} / {{ item.product.unit }}</del></p>
                <p class="h4 fw-bold text-end mt-1 fs-5">NT$ {{ item.product.price }} / {{ item.product.unit }}</p>
              </div>
            </div>
        </div>

      </div>
    </div>

</template>

<script>

import emitter from '@/libs/emitter'
import PaginationView from '@/components/PaginationView.vue'
export default {
  data() {
    return {
      category: 'all', // 商品分類 分流用
      products: [], // API抓下來儲存商品用 - 分頁ver
      productsAll: [], // API抓下來儲存商品用 - allver
      pagination: '', // 分頁用
      favorite: JSON.parse(localStorage.getItem('favorite')) || [] // favorlist 儲存用 - 抓 localStorage 的資料 (需要轉乘json才能使用 localStorage存的是文字) (需要有預設值 [] 因為一開始是空的話會出錯 ex ? 結構問題)
    }
  },
  components: {
    PaginationView
  },
  methods: {
    // 抓商品資料 - 關注 ver
    getData(page = 1, category){
      const url = `${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/product`
      this.favorite.forEach(item => {
        this.$http.get(`${url}/${item}`)
        .then((res) => {
          this.products.push(res.data)
          console.log('123')
          console.log(this.products)
        })
      })
      console.log('1234')
    },
    // 加入購物車 這裡 用html傳進來的 item抓id、qty先暫時用預設 還沒有做數量功能
    addToCart(item, qty = 1){
      const data = {
        product_id: item.id,
        qty
      }
      this.$http.post(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/cart`, { data })
      .then(() => {
        emitter.emit('get-cart') // 此處觸發 NAVBAR接收
      })
      .catch((err) => {
        console.dir(err.data.message)
      })
    },
    // 最愛狀態更換 - findIndex 判定 id是否存在 不存在加入 存在刪除
    toggleFavorite(id){
      const favoriteId = this.favorite.findIndex(item => item === id)
      if (favoriteId === -1){ //  findIndex 沒有的話會 -1 而 -1 也是 true
        this.favorite.push(id)
      } else { // findIndex 有的話會回傳 目標在array的 index位置
        this.favorite.splice(favoriteId, 1)
        const productId = this.products.findIndex(item => item.product.id === id) // 同上面 favoriteId 刪減 應用在 products 上 只是結構不同 需要改成 item.product.id
        this.products.splice(productId, 1)
      }
    }
  },
  watch: {
    favorite: { // 因為是 陣列 所以需要 深層監聽
      handler(){ // 控制器
        // localStorage.setItem('自訂的欄位名稱', 要帶入的 JSON檔案 )
        // localStorage 沒辦法存 JSON 所以得先轉成字串
        localStorage.setItem('favorite', JSON.stringify(this.favorite)) // 資料變動的時候寫入到 localStorage
      },
      deep: true // 深層監聽
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
