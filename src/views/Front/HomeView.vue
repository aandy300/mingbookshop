<template>

    <div class="position-relative">
      <!-- 大img bk -->
      <div class="" style="height: 80vh; background-image: url(https://i.imgur.com/zlRhPl1.jpg); background-position: center center; background-size: cover;">
        <div class="container d-flex flex-column justify-content-center align-items-center" style="height: 70vh;">
          <div class="row my-auto">
            <div class="col text-center">
                <h2 style="color:white">書香環繞 幽靜疏朗<br>此刻開始你的知識饗宴</h2>
                <p style="color:white" class=" mb-0">在這知識的寶庫，總有一本書會吸引到你。</p>
                <router-link style="text-decoration:none;" to="/products">
                  <button type="button" class="btn btn-dark rounded-0 mt-4">查看書籍</button>
                </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分割線 -->
    <div class="bg-light py-4 my-5 d-flex justify-content-center align-items-center">
      <h2 style="color:black">近期活動</h2>
    </div>
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
                  <h2 style="color:white; text-shadow: black 0.1em 0.1em 0.3em;">《 藝術特展博覽會 》</h2>
                  <p style="color:white; text-shadow: black 0.1em 0.1em 0.3em;" class=" mb-0">2024年10月15日（三） <br>12：30pm—19：00pm｜台北市立圖書館 1F 中央廣場</p>
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
                    <h2 style="color:white; text-shadow: black 0.1em 0.1em 0.3em;">《 心流思考訓練 》<br>新書分享會</h2>
                    <p style="color:white; text-shadow: black 0.1em 0.1em 0.3em;" class=" mb-0">2021年12月32日（一） <br>1：30pm—3：00pm｜台北市立圖書館 2F 閱讀書區</p>
                </div>
              </div>
            </div>
          </div>
      </swiper-slide>
      <swiper-slide>
          <div class="bg-light py-5" style="width: 100%; background-image: url('https://i.imgur.com/u4vWi9Q.jpg'); background-position: 50% 65%; background-size: cover;">
            <div class="container d-flex flex-column justify-content-center align-items-center" style="height: 70vh;">
              <div class="row my-auto">
                <div class="col text-center">
                    <h2 style="color:white; text-shadow: black 0.1em 0.1em 0.3em;">《 年末-送舊迎新 》<br>年度好書回顧講座</h2>
                    <p style="color:white; text-shadow: black 0.1em 0.1em 0.3em;" class=" mb-0">2022年12月31日（六） <br>08：00pm—23：59pm｜線上、中央圖書館</p>
                </div>
              </div>
            </div>
          </div>
      </swiper-slide>
    </swiper>
    <!-- swiper end -->

    <!-- 分割線 -->
    <div class="bg-light py-4 my-5 d-flex justify-content-center align-items-center">
      <h2 style="color:black">熱門商品</h2>
    </div>

    <!-- swiper -->
    <!-- on rwd 大的時候 -->
    <div class="container my-5 d-none d-md-block">
      <swiper
      :slidesPerView="3"
      :spaceBetween="5"
      :slidesPerGroup="2"
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
            </div>
          </div>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
    <!-- on rwd 小的時候 -->
    <div class="container my-5 d-block d-md-none">
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

    <!-- 分割線 -->
    <div class="bg-light py-4 my-5 d-flex justify-content-center align-items-center">
      <h2 style="color:black">環境介紹</h2>
    </div>

    <!-- 三商品容器 -->
    <!-- rounded-0 原本沒圓角的話 -->
    <div class="container">
      <div class="row">
        <div class="col-md-4 mt-md-4">
          <div class="card- border-0 mb-4">
            <img
              src="https://i.imgur.com/CwDtw8n.jpg"
              class="card-img-top rounded"
              alt="..."
            />
            <div class="card-body text-center">
              <h4>舒適宜人的環境</h4>
              <div class="d-flex justify-content-between">
                <p class="card-text text-muted mb-0">
                  清幽靜謐的閱讀環境，讓環繞周圍的書香洗淨你的心靈。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 mt-md-4">
          <div class="card- border-0 mb-4">
            <img
              src="https://i.imgur.com/KBUrjVQ.jpg"
              class="card-img-top rounded"
              style="background-position: center center;"
              alt="..."
            />
            <div class="card-body text-center">
              <h4>數量繁多的書籍</h4>
              <div class="d-flex justify-content-between">
                <p class="card-text text-muted mb-0">
                  恆河沙數的書籍，這邊不會有你想要而沒有的書籍。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 mt-md-4">
          <div class="card- border-0 mb-4">
            <img
              src="https://i.imgur.com/h9Z1SMk.jpg"
              class="card-img-top rounded"
              alt="..."
            />
            <div class="card-body text-center">
              <h4>來杯咖啡釋放壓力</h4>
              <div class="d-flex justify-content-center">
                <p class="card-text text-muted mb-0">
                  喝杯香氣迷人、豐富口感的咖啡，提起你的精神，開始你的知識之旅。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  -->
    <div class="bg-light py-5 d-flex justify-content-center align-items-center">
    </div>
    <!--  -->

    <div class="bg-light py-5" style="background-image: url('https://i.imgur.com/GUusOW4.jpg'); background-position: 50% 51%; background-size: cover;">
      <div class="container d-flex flex-column justify-content-between align-items-center">
        <!-- <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start"> -->
        <div class="d-flex flex-column justify-content-between align-items-center col-md-5">
          <p class="my-3" style="color:white; text-shadow: black 0.1em 0.1em 0.2em;">訂閱電子報，第一時間獲得資訊！</p>
          <div class="input-group w-md-50 mt-md-0 mt-3 mb-3">
            <input type="text" class="form-control rounded-0" placeholder="輸入信箱，開始訂閱！" />
            <div class="input-group-append">
              <button type="button" class="btn btn-dark rounded-0" id="search">
                訂閱
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  <RouterView/>
  <!-- <router-view :key="$route.path"/> -->
  <!-- <router-view :key="$route.fullPath"></router-view> -->
</template>

<script>

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default {
  data() {
    return {
      products: [],
      pagination: ''
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
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
    }
  },
  setup() {
    return {
      modules: [Pagination, Navigation, Autoplay]
    }
  },
  mounted() {
    this.getData()
  },
  beforeCreate: () => {
        document.body.className = 'home'
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
