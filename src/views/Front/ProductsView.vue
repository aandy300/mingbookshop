<template>
    <!-- 分類 -->
    <nav class="navbar navbar-expand-lg navbar-light justify-content-center border border-start-0 border-end-0 border-top border-bottom">
      <div class="navbar-nav flex-row overflow-auto navbar-custom-scroll">
        <a class="nav-item nav-link text-nowrap px-2" @click="getData()" onclick="event.preventDefault()" href="#">全部商品</a>
        <a class="nav-item nav-link text-nowrap px-2" @click="pagination = {total_pages: 1}, getData(1, '分類一')" onclick="event.preventDefault()" href="#">文物書籍</a>
        <a class="nav-item nav-link text-nowrap px-2" @click="pagination = {total_pages: 1}, getData(1, '分類二')" onclick="event.preventDefault()" href="#">周邊雜誌</a>
        <a class="nav-item nav-link text-nowrap px-2" @click="pagination = {total_pages: 1}, getData(1, '分類三')" onclick="event.preventDefault()" href="#">其他用品<span class="sr-only">(current)</span></a>
      </div>
    </nav>
    <!-- 分類END -->
    <div class="container mt-md-5 mt-3 mb-7" style="min-height: 100vh">
      <div class="row">
        <!-- 商品資料單項 -->
        <div class="col-md-6 col-lg-4 col-xl-3" v-for="item in products" :key="item.id" style="height: auto">
            <div class="card border-0 mb-4 position-relative rounded">
              <!-- img -->
              <figure style="" class="figure d-flex flex-column justify-content-center align-items-center position-relative pt-3">
                <i v-if="favorite.includes(item.id)" @click="toggleFavorite(item.id)" class="bi bi-heart-fill position-absolute btn btn-lg" style="right: 3px; top: 3px; color:red;"></i>
                <i v-else @click="toggleFavorite(item.id)" class="bi bi-suit-heart position-absolute btn btn-lg" style="right: 3px; top: 3px; color:red;"></i>
                <router-link style="text-decoration:none;" :to="`/product/${item.id}`">
                  <img style="height:200px" :src="item.imageUrl" alt="" class="figure-img img-fluid rounded">
                </router-link>
              </figure>
              <!-- 商品資料 -->
              <div class="card-body d-flex flex-column justify-content-center align-items-center pt-0">
                <h4 class="mb-0">
                  <router-link class="card-text text-muted" :to="`/product/${item.id}`" style="text-decoration:none;">
                    <!-- 商品標題 -->
                    <p class="fs-5 mb-1" style="color:black; height: 1.5rem; overflow:hidden;" onmouseover="this.style.color='#B08968';" onmouseout="this.style.color='';">{{item.title}}</p>
                  </router-link>
                </h4>
                <p class="card-text text-muted mb-0" style="height: 4.5rem; overflow:hidden;">{{item.description}}</p>
                <div class="d-flex justify-content-between align-items-center col-12">
                  <div class="">
                    <p style="white-space: nowrap; text-align: center" class="mb-0 text-muted text-end mt-2"><del>NT$ {{ item.origin_price }} / {{ item.unit }}</del></p>
                    <p style="white-space: nowrap; text-align: center" class="h4 fw-bold text-end mt-1 fs-5">NT$ {{ item.price }} / {{ item.unit }}</p>
                  </div>
                  <div>
                    <button @click.prevent="addToCart(item)" style="white-space: nowrap" type="button" class="btn btn-secondary text-end ">加入購物車</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <!-- 商品資料單項 END -->
      </div>

      <!-- 分頁元件 -->
      <PaginationView class="mt-6" :pages="pagination" @get-data="getData"></PaginationView>

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
    // 抓商品資料 - 分頁 + 分類
    getData(page = 1, category){
      let url = `${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/products/?page=${page}`
      if (category) {
        url = `${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/products/?page=${page}&category=${category}`
      }
      this.$http.get(url)
      .then((res) => {
        this.products = res.data.products
        this.pagination = res.data.pagination
      })
      .catch((err) => {
        console.dir(err)
      })
    },
    // 抓商品資料 - All
    getDataAll(){
      this.$http.get(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/products/all`)
      .then((res) => {
        this.productsAll = res.data.products
      })
      .catch((err) => {
        console.dir(err)
      })
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
      }
    },
      scrollToTop(){
      window.scrollTo(0, 0)
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
    this.scrollToTop()
  }
}
</script>
