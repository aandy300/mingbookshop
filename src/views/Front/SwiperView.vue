// swiper 測試OK
<template>
  <swiper
    :slidesPerView="4"
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
      <div class="card" style="width: 15rem;">
        <!-- <img :src="item.imageUrl" class="card-img-top img-fluid" style="height: 150px;" alt="...">
         -->
        <figure class="figure d-flex flex-column justify-content-center align-items-center mb-0 mt-3">
          <img style="height: 150px" :src="item.imageUrl" alt="" class="figure-img img-fluid rounded">
        <!-- <figcaption class="figure-caption text-start">圖片僅供參考</figcaption> -->
        </figure>
        <div class="card-body d-flex flex-column justify-content-center align-items-center p-2 pb-3">
          <p class="card-title fs-6" style="overflow: hidden; white-space: nowrap;">{{ item.title }}</p>
          <a href="#" class="btn btn-primary">查看商品</a>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>


<script>

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, Autoplay } from "swiper"

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default {
  data() {
    return {
      products: [],
      pagination: ''
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Navigation, Autoplay],
    };
  },
  methods: {
      getData(page = 1, category = '分類二'){
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
  mounted() {
    this.getData()
  },
};
</script>

<style lang="sass">
    .swiper-button-prev, .swiper-button-next
        color: gray
    .swiper-slide
      height: 300px
      width: 300px
      display: flex
      // background: #eee
      align-items: center
      justify-content: center
      // transition: all 200ms linear
      // transform: scale(0.8)

</style>