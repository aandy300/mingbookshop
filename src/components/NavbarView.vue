<template>
     <div class="bg-white sticky-top">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-expand-lg navbar-light bg-white">
          <!-- 中央名稱 -->
          <router-link class="navbar-brand position-absolute d-none d-sm-block" style="left: 50%; transform: translate(-50%, -50%); top: 50%;" to="/">日玥書坊</router-link>
          <!-- RWD icon -->
          <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            <!-- <i class="bi bi-cart"></i> -->
          </button>
          <!-- 連結 -->
          <div class="collapse navbar-collapse bg-white custom-header-md-open" id="navbarNav" ref="navbar">
            <!-- d-flex justify-content-center align-items-center -->
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" to="/">首頁</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/about">品牌特色</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/products">產品列表</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/cart">購物車</router-link>
              </li>
            </ul>
          </div>
          <!-- 右邊icon -->
          <div class="d-flex">
              <router-link class="nav-link" to="/favorites">
                <i class="bi bi-heart-fill btn btn-sm fs-6">
                  <!-- <span class="position-absolute translate-middle badge rounded-pill bg-danger" style="top:1rem">{{ favorite.length }}</span> -->
                </i>
              </router-link>
              <router-link class="nav-link" to="/cart">
                <i class="bi bi-cart position-relative btn btn-sm px-1 fs-6">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{{ cartData.carts.length }}</span>
                </i>
              </router-link>
            <!-- <a href="#"><i class="fas fa-heart me-5"></i></a>
            <a href="./cart-2.html"><i class="fas fa-shopping-cart"></i></a> -->
          </div>
        </nav>
      </div>
    </div>
</template>

<script>

import emitter from '@/libs/emitter'
import { Collapse } from 'bootstrap'
export default {
  data() {
        return {
          navbar: {},
          cartData: {
              carts: []
          },
          favorite: JSON.parse(localStorage.getItem('favorite')) || [] // favorlist 儲存用 - 抓 localStorage 的資料 (需要轉乘json才能使用 localStorage存的是文字) (需要有預設值 [] 因為一開始是空的話會出錯 ex ? 結構問題)
        }
  },
  methods: {
    getCart() {
      this.$http.get(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/cart`)
        .then((res) => {
          this.cartData = res.data.data
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  watch: {
    $route() { // for nav bar hide
      this.navbar.hide()
    },
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
    this.getCart()
    emitter.on('get-cart', () => {
      this.getCart()
    })
    // 這個 nav沒辦法觀的原因 預設是 一直展開的 true
    this.navbar = new Collapse(this.$refs.navbar, {
      toggle: false
    })
  }
}
</script>
