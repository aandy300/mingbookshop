<template>
    <div class="container" style="min-height: 100vh">
      <div class="row align-items-center">
        <!-- 中斷點後面的數字代表甚麼?? -->
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
            <figure class="figure d-flex flex-column justify-content-center align-items-center mt-5">
              <img style="height: 550px" :src="product.imageUrl" alt="" class="figure-img img-fluid rounded d-none d-md-block">
              <img style="height: 300px" :src="product.imageUrl" alt="" class="figure-img img-fluid rounded d-block d-md-none">
              <!-- <figcaption class="figure-caption text-start">圖片僅供參考</figcaption> -->
            </figure>
            </div>
          </div>
        </div>
        <!-- 商品資訊 結構容器 -->
        <div class="col-md-12 col-lg-12 col-xl-5">
          <!-- 現在位置  navlink-->
          <nav aria-label="breadcrumb" class="d-flex justify-content-between align-items-center my-2">
            <ol class="breadcrumb bg-white px-0 mb-0 py-3">
              <router-link class="breadcrumb-item" to="/">首頁</router-link>
              <router-link class="breadcrumb-item" to="/products">產品列表</router-link>
              <!-- pointer-events: none; 無效手掌 evnt-->
              <router-link class="breadcrumb-item text-primary" style="text-decoration:none;  cursor: text;" aria-current="page" to="">商品細項</router-link>
            </ol>
            <div>
              <a v-if="favorite.includes(product.id)" @click.prevent="toggleFavorite(this.$route.params.id)" class="text-nowrap btn btn-dark py-1">已在關注清單</a>
              <a v-else @click.prevent="toggleFavorite(product.id)" class="text-nowrap btn btn-outline-dark py-1">加入關注清單</a>
            </div>
          </nav>
          <!-- 商品 標題 價格 -->
          <h2 class="fw-bold h1 mb-1">{{ product.title }}</h2>
          <p class="mb-0 text-muted text-end"><del>NT$ {{ product.origin_price }}</del></p>
          <p class="h4 fw-bold text-end">NT$ {{ product.price }}</p>
          <div class="row align-items-center">
            <!-- + - 按鈕 -->
            <div class="col-6">
              <div class="input-group my-3 bg-light rounded">
                <!-- 加入購物車 數量 -->
                <div class="input-group-prepend">
                  <!-- - btn -->
                  <button class="btn btn-outline-dark border-0 py-2" @click="qtyCount('-')" type="button" id="button-addon1" :disabled="qty === 1">
                    <i class="bi bi-dash-lg"></i>
                  </button>
                </div>
                <input v-model="qty" type="text" class="form-control border-0 text-center my-auto shadow-none bg-light" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                <div class="input-group-append">
                  <!-- + btn -->
                  <button class="btn btn-outline-dark border-0 py-2" @click="qtyCount('+')" type="button" id="button-addon2">
                    <i class="bi bi-plus-lg"></i>
                  </button>
                </div>
              </div>
            </div>
            <!-- 加入購物車 btn -->
            <div class="col-6">
              <a href="./checkout.html" @click.prevent="addToCart(), qtyCount('reset')" class="text-nowrap btn btn-dark w-100 py-2">加入購物車</a>
            </div>
          </div>
        </div>
      </div>
      <!-- 商品資訊 end -->

      <!-- 商品說明 -->
      <!-- v-html for 文字換行問題 -->
      <div >
        <div class="row mt-5 d-flex flex-column justify-content-center align-items-center">

          <div class="col-md-12 col-lg-12 col-xl-10 my-1">
            <p class="h3 mb-4 card-header">產品說明</p>
            <p v-html="product.description"></p>
          </div>
          <div class="col-md-12 col-lg-12 col-xl-10 my-1">
            <p class="h3 mb-4 card-header">產品規格</p>
            <p v-html="product.content" class="text-muted"></p>
          </div>

        </div>
      </div>
      <!-- 商品說明 end -->

      <!-- 常見問題 -->
      <div class="d-flex flex-column justify-content-center align-items-center">
        <div class="d-flex flex-column justify-content-center align-items-center row col-12">
        <div class="border-light col-md-12 col-lg-12 col-xl-10 my-1 p-0">
          <div class="card-header mb-4"><h3>常見問題</h3></div>
          <!-- color: var(--bs-gray-dark);" -->
          <!-- 手風琴  -->
          <div class="accordion accordion-flush my-3" id="accordionFlushExample">

            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne" > <!-- 邊框顏色 = style="background-color:#000;" -->
                <button style="color: var(--bs-gray-dark);" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  到貨時間說明
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <p class="card-text">1.新書預購：</p>
                  <p class="card-text">於預購期間內訂購，請參考商品頁的預計到貨日(此為首批商品到貨日期)若您於預購期間內訂購但逾期未到貨，則是因為您訂購時已超過首批到貨量，需再向國外加訂，到貨時間約是原預計到貨日後3~4週，如有特殊情況將在商品頁中說明。</p>
                  <p class="card-text">2.既刊調貨：</p>
                  <p class="card-text">既刊商品為商品頁僅顯示上架日期無預計到貨日，訂購該類且無庫存之商品，在您完成訂單程序之後，調貨時間約7~14個工作日左右，若已無庫存，需由國外再進口，則時間約需3~4週。</p>
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingTwo" style="background-color:#000;">
                <button style="color: var(--bs-gray-dark);" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  送貨方式
                </button>
              </h2>
              <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <p class="card-text">商品配送方式 － 透過消費者選擇之物流方式送達。<br><br>消費者訂購之商品若經配送兩次無法送達，再經本公司以電話與Email均無法聯繫逾三天者，本公司將取消該筆訂單，並且全額退款。</p>
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingThree" style="background-color:#000;">
                <button style="color: var(--bs-gray-dark);" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  退貨說明
                </button>
              </h2>
              <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <p class="card-text">請注意！下列商品購買後不提供10天的猶豫期。</p>
                  <p class="card-text">1.易於腐敗、保存期限較短或解約時即將逾期。</p>
                  <p class="card-text">2.客製化之商品。</p>
                  <p class="card-text">3.報紙、期刊或雜誌。</p>
                  <p class="card-text">4.下載版軟體、資訊及電子書。</p>
                  <p class="card-text">5.藝文展覽票券、藝文表演票券。</p>
                  <p class="card-text">非屬上列品項之商品均享有到貨十天的猶豫期﹝含例假日﹞。退回之商品必須於猶豫期內寄回。 </p>
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingFour" style="background-color:#000;">
                <button style="color: var(--bs-gray-dark);" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                  其他事項
                </button>
              </h2>
              <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                  <p class="card-text">商品、活動不定期更新，訂閱電子報獲得最新資訊！</p>
                </div>
              </div>
            </div>

          </div>
          <!-- 手風琴end -->
        </div>
        </div>
      </div>
      <!-- 常見問題 end -->
      <div class="row mb-5 d-flex flex-column justify-content-center align-items-center">

        <div class="col-md-12 col-lg-12 col-xl-10 my-1">
          <p class="h3 mb-4 card-header">相關商品</p>
          <!-- swiper -->
          <!-- on rwd 大的時候 -->
          <div class="my-5 d-none d-lg-block">
            <swiper
            :slidesPerView="3"
            :spaceBetween="5"
            :slidesPerGroup="3"
            :slidePrev=(5000)
            :loop="true"
            :loopFillGroupWithBlank="true"
            :pagination="{
              clickable: true,
            }"
            :navigation="true"
            :modules="modules"
            :autoplay="{
                  delay: 5000,
                  pauseOnMouseEnter: true,
                  disableOnInteraction: false,
            }"
            class="mySwiper"
            >
              <swiper-slide v-for="item in products" :key="item.id">
                <router-link style="text-decoration:none; color: var(--bs-gray-dark);" :to="`/product/${item.id}`">
                <div class="card rounded" style="width: 15rem;">
                  <!-- <img :src="item.imageUrl" class="card-img-top img-fluid" style="height: 150px;" alt="...">
                  -->
                  <figure class="figure d-flex flex-column justify-content-center align-items-center mb-0 mt-3">
                    <img style="height: 150px" :src="item.imageUrl" alt="" class="figure-img img-fluid rounded">
                  <!-- <figcaption class="figure-caption text-start">圖片僅供參考</figcaption> -->
                  </figure>
                  <div class="card-body d-flex flex-column justify-content-center align-items-center p-2 pb-3">
                    <p class="card-title fs-6" style="overflow: hidden;">{{ item.title }}</p>
                    <router-link class="btn btn-primary" style="text-decoration:none;" :to="`/product/${item.id}`">查看商品</router-link>
                    <!-- <router-link class="btn btn-primary" style="text-decoration:none;" :key="`$route.fullPath`" :to="`/product/${item.id}`" @click="beforeRouteUpdate(item.id)">查看商品</router-link> -->
                  </div>
                </div>
                </router-link>
              </swiper-slide>
            </swiper>
          </div>
          <!-- on rwd 小的時候 -->
          <div class="container my-5 d-block d-lg-none">
            <swiper
            :slidesPerView="1"
            :spaceBetween="5"
            :slidesPerGroup="1"
            :slidePrev=(5000)
            :loop="true"
            :loopFillGroupWithBlank="true"
            :pagination="{
              clickable: true,
            }"
            :navigation="true"
            :modules="modules"
            :autoplay="{
                  delay: 5000,
                  pauseOnMouseEnter: true,
                  disableOnInteraction: false,
            }"
            class="mySwiper"
            >
              <swiper-slide v-for="item in products" :key="item.id">
                <router-link style="text-decoration:none; color: var(--bs-gray-dark);" :to="`/product/${item.id}`">
                <div class="card rounded" style="width: 15rem;">
                  <!-- <img :src="item.imageUrl" class="card-img-top img-fluid" style="height: 150px;" alt="...">
                  -->
                  <figure class="figure d-flex flex-column justify-content-center align-items-center mb-0 mt-3">
                    <img style="height: 150px" :src="item.imageUrl" alt="" class="figure-img img-fluid rounded">
                  <!-- <figcaption class="figure-caption text-start">圖片僅供參考</figcaption> -->
                  </figure>
                  <div class="card-body d-flex flex-column justify-content-center align-items-center p-2 pb-3">
                    <p class="card-title fs-6" style="text-align: center; overflow: hidden;">{{ item.title }}</p>
                    <router-link class="btn btn-primary" style="text-decoration:none;" :to="`/product/${item.id}`">查看商品</router-link>
                  </div>
                </div>
                </router-link>
              </swiper-slide>
            </swiper>
          </div>
          <!-- swiper end -->
        </div>

        <div class="col-md-12 col-lg-12 col-xl-10 my-1">
          <p class="h3 card-header">相關活動</p>
          <!-- swiper str -->
          <swiper
            :slidesPerView="1"
            :slidesPerGroup="1"
            :slidePrev=(5000)
            :loop="true"
            :loopFillGroupWithBlank="true"
            :pagination="{
              clickable: true,
            }"
            :modules="modules"
            :autoplay="{
                  delay: 7000,
                  pauseOnMouseEnter: true,
                  disableOnInteraction: false,
            }"
            class="mySwiper"
            >
            <swiper-slide>
              <div class="bg-light py-5" style="width: 100%; background-image: url('https://i.imgur.com/Ljlc9IS.jpg'); background-position: 50% 50%; background-size: cover;">
                <div class="container d-flex flex-column justify-content-center align-items-center" style="height: 70vh;">
                  <div class="row my-auto">
                    <div class="col text-center">
                        <!-- 文創市集? -->
                        <h2 style="color:white; text-shadow: black 0.1em 0.1em 0.3em;">《 春季新書特價85折 》</h2>
                        <p style="color:white; text-shadow: black 0.1em 0.1em 0.3em;" class=" mb-0">2024年10月15日（三）—2024年12月15日（一）</p>
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
                <div class="bg-light py-5" style="width: 100%; background-image: url('https://i.imgur.com/8RAlzBG.jpg'); background-position: 50% 70%; background-size: cover;">
                  <div class="container d-flex flex-column justify-content-center align-items-center" style="height: 70vh;">
                    <div class="row my-auto">
                      <div class="col text-center">
                          <h2 style="color:white; text-shadow: black 0.1em 0.1em 0.3em;">《 心理學書籍特展 》</h2>
                          <p style="color:white; text-shadow: black 0.1em 0.1em 0.3em;" class=" mb-0">2024年10月15日（三）—2021年11月11日（一）</p>
                      </div>
                    </div>
                  </div>
                </div>
            </swiper-slide>
          </swiper>
          <!-- swiper end -->
        </div>
        <!-- container end -->
      </div>

    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import emitter from '@/libs/emitter'

export default {
  data() {
    return {
      qty: 1,
      products: [],
      product: {
        imageUrl: '',
        content: '',
        description: ''
      },
      favorite: JSON.parse(localStorage.getItem('favorite')) || [] // favorlist 儲存用 - 抓 localStorage 的資料 (需要轉乘json才能使用 localStorage存的是文字) (需要有預設值 [] 因為一開始是空的話會出錯 ex ? 結構問題)
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    getDataAll(){
      const url = `${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/products/all`
      this.$http.get(url)
      .then((res) => {
        this.products = res.data.products
      })
      .catch((err) => {
        console.dir(err)
      })
    },
    getProduct() {
      const id = this.$route.params.id
      // const { id } = this.$route.params  // 解構的寫法
      this.$http.get(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/product/${id}`)
        .then(res => {
          this.product = res.data.product
          this.product.description = this.product.description.replace(/\n/g, '<br>')
          this.product.content = this.product.content.replace(/\n/g, '<br>')
        })
        .catch((err) => {
          console.dir(err)
        })
    },
    addToCart(qty = this.qty){
      const data = {
        product_id: this.$route.params.id,
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
    qtyCount(status){
      if (status === '+'){
        this.qty += 1
      } else if (status === '-'){
        if (this.qty <= 1){
          // 已經是最小數量了
        } else {
          this.qty -= 1
        }
      } else if (status === 'reset'){
        this.qty = 1
      }
    },
    scrollToTop(){
      window.scrollTo(0, 0)
    },
    toggleFavorite(id){
      const favoriteId = this.favorite.findIndex(item => item === id)
      if (favoriteId === -1){ //  findIndex 沒有的話會 -1 而 -1 也是 true
        this.favorite.push(id)
      } else { // findIndex 有的話會回傳 目標在array的 index位置
        this.favorite.splice(favoriteId, 1)
      }
    },
    reflesh(){ // for 同樣頁面更新問題 - 沒用到
      this.$root.reload()
      // this.$router.go('/product')
      // location.reload(0)
    }
  },
  async beforeRouteUpdate(path){ // for 同樣頁面更新問題 - 沒用到
    try {
      // this.$router.go('/products')
      // this.$router.push(`/product/${path}`)
      // this.$router.go('/product/-Mz24vMno377r18ObujG')
    } catch (err){
      console.log(err)
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
  setup() {
    return {
      modules: [Pagination, Navigation, Autoplay]
    }
  },
  created() {
    // location.reload()
        this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // react to route changes...
        console.log('456456')
        // this.$forceUpdate()
        location.reload()
        // this.isRouterAlive = false
        // this.$nextTick(() => { this.isRouterAlive = true })
      })
  },
  mounted() {
    this.getProduct()
    this.getDataAll()
    this.scrollToTop()
  }
}
</script>

<style lang="sass">

  .swiper-pagination
    display: none
  .swiper-button-prev, .swiper-button-next
    color: var(--bs-gray-dark)
  .swiper-slide
    height: 300px
    width: 300px
    display: flex
    align-items: center
    justify-content: center

</style>
