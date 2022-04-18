<template>
<div class="container d-flex flex-column justify-content-center align-items-center" style="min-height: 100vh">
  <div v-if="ready === true" class="row col-12">
    <!-- card 付款狀態 -->
    <div v-if="cartData.carts.length === 0" class="d-flex justify-content-center my-5">
      <div class="col-md-6 border border-dark text-center">
        <div class="card-body">
          <strong ><p class="m-0 text-primary" style="font-size: 2rem;">購物車目前沒有東西</p></strong>
          <router-link to="/products">
          <button type="button" class="col-4 btn btn-outline-primary mt-2">前去購買</button>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 購買步驟狀態 -->
    <div v-else class="row d-flex flex-nowrap justify-content-center align-items-center">
      <!-- style="max-width: 18rem;" -->
      <!-- OKver -->
      <!-- <div style="max-width: 18rem;" class="col-3 d-flex align-items-center card text-white bg-secondary my-5 mx-4 rounded ">
        <i class="bi bi-check2-circle mt-2" style="font-size:40px"></i>
          <p class="card-text text-center m-0">Step1</p>
          <p class="card-text text-center mb-2">確認訂單</p>
      </div> -->
      <!-- wait ver -->
      <!-- <div style="max-width: 18rem;" class="col-3 d-flex align-items-center card text-balck bg-info my-5 mx-4 rounded">
        <i class="bi bi-dash-circle-dotted mt-2" style="font-size:40px"></i>
          <p class="card-text text-center m-0">Step2</p>
          <p class="card-text text-center mb-2">建立訂單</p>
      </div> -->
      <div style="max-width: 18rem;" class="col-3 d-none d-sm-block  text-white bg-secondary my-5 mx-4 rounded ">
        <div class="d-flex flex-column flex-nowrap justify-content-center align-items-center">
        <i class="bi bi-dash-circle-dotted mt-2" style="font-size:40px"></i>
          <p class="card-text text-center m-0">Step1</p>
          <p class="card-text text-center mb-2">確認訂單</p>
        </div>
      </div>
      <div style="max-width: 18rem;" class="col-3 d-none d-sm-block  text-balck bg-info my-5 mx-4 rounded">
        <div class="d-flex flex-column flex-nowrap justify-content-center align-items-center">
          <i class="bi bi-dash-circle-dotted mt-2" style="font-size:40px"></i>
          <p class="card-text text-center m-0">Step2</p>
          <p class="card-text text-center mb-2">建立訂單</p>
        </div>
      </div>
      <div style="max-width: 18rem;" class="col-3 d-none d-sm-block  text-balck bg-info my-5 mx-4 rounded">
        <div class="d-flex flex-column flex-nowrap justify-content-center align-items-center">
          <i class="bi bi-dash-circle-dotted mt-2" style="font-size:40px"></i>
          <p class="card-text text-center m-0">Step3</p>
          <p class="card-text text-center mb-2">付款</p>
        </div>
      </div>
      <!-- for rwd 顯示 單個 購買狀態 -->
      <div style="max-width: 18rem;" class="col-10 d-flex align-items-center d-block d-sm-none text-balck bg-info my-5 mx-4 rounded">
        <div class="d-flex flex-column flex-nowrap justify-content-center align-items-center col-12">
          <i class="bi bi-dash-circle-dotted mt-2 text-center" style="font-size:40px;"></i>
          <p class="card-text text-center m-0">Step1</p>
          <p class="card-text text-center mb-2">確認訂單</p>
        </div>
      </div>
    </div>
    <!-- 購物車列表商品資訊 All Start -->
    <div v-if="cartData.carts.length > 0" class="row">
      <!-- 購物車列表 - 商品列表 -->
      <div class="col-xl-12">
        <div class="d-flex justify-content-between mb-2">
        <h4>訂單內容</h4>
        <!-- 清空購物車 - 按鈕 -->
        <div class="text-end">
          <button type="button" @click="removeAllCartItem" :class=" {'disabled' :cartData.carts.length === 0 }"
            class="btn btn-outline-primary">清空購物車</button>
        </div>
        <!-- 清空購物車 - 按鈕 結束 -->
        </div>
        <table class="table align-middle">
          <thead class="">
            <!-- <tr>
              <th class="">商品</th>
            </tr> -->
            <tr class="col-12">
              <th></th>
              <th class="col-4 text-nowrap text-center">圖片</th>
              <th class="col-4 text-center" style="width:40%;">品名</th>
              <th class="col-4 text-nowrap text-center" style="width:20%;">數量/單位</th>
              <th class="col-4 text-center" style="width:10%" >單價</th>
            </tr>
          </thead>
          <tbody>
            <!-- 購物車 - 架構 綁 V -->
            <!-- 折扣卷 購物車有資料時才顯示 -->
            <template v-if="cartData.carts">
              <tr v-for=" item in cartData.carts" :key="item.id">
                <td>
                  <!-- 購物車 - x 移除購物車商品按鈕 -->
                  <button @click="removeCartItem( item.id )" :disabled="isLoadingItem === item.id"
                  type="button" class="btn btn-outline-danger btn-sm px-2 py-1">
                    x
                  </button>
                </td>
                <!-- d-none d-sm-block  = 手機板隱藏圖片 -->
                <td class="">
                  <!-- 購物車 - 商品圖片 -->
                  <!-- <img style="height: 100px;" class="img-fluid" :src="item.product.imageUrl" alt=""> -->
                  <figure style="" class="figure d-flex flex-column justify-content-center align-items-center position-relative pt-3">
                    <router-link style="text-decoration:none;" :to="`/product/${item.product.id}`">
                      <img style="height:150px" :src="item.product.imageUrl" alt="" class="figure-img img-fluid rounded d-none d-md-block">
                      <img style="" :src="item.product.imageUrl" alt="" class="figure-img img-fluid rounded d-block d-md-none">
                    </router-link>
                  </figure>
                </td>
                <td class="text-center">
                  {{ item.product.title }}
                  <!-- <div class="text-success">已套用優惠券</div> -->
                </td>
                <td>
                  <!-- 購物車 - 商品數量 -->
                  <div class="input-group input-group-sm">
                    <div class="input-group mb-3">
                      <!-- <input v-model=" item.qty " min="1" type="number" class="form-control"> -->
                      <select id="" class="form-select mt-3"
                      v-model=" item.qty" @change=" updataCartItem( item )" :disabled="isLoadingItem === item.id">
                        <!-- :selected="item.qty === num" -->
                        <option :value="num" v-for=" num in 20" :key="`${num} + ${item.id}`" > {{ num }} </option>
                      </select>
                      <span class="input-group-text mt-3" id="basic-addon2">{{ item.product.unit }}</span>
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  $ {{ item.total }}
                </td>
              </tr>
            </template>
          </tbody>
          <!-- 上面綁 V 結束 -->
          <!-- 總計 -->
          <!-- colspan = 要跨行的列數 -->
          <!-- <tfoot>
            <tr>
              <td></td>
              <td colspan="3" class="text-end fs-3">總計</td>
              <td class="text-end fs-5">{{ cartData.total }}</td>
            </tr>
            <tr>
              <td></td>
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ cartData.total }}</td>
            </tr>
          </tfoot> -->
        </table>
        <div class="d-flex flex-column">
          <!-- 總計 套用優惠卷前的 -->
          <div class="d-flex justify-content-between">
            <p>套用優惠卷:2022BOOK</p>
            <p v-if="couponActive" class="fs-4"><del>總計: $ {{ cartData.total }}</del></p>
            <p v-else class="fs-4">總計: $ {{ cartData.total }}</p>
          </div>
          <!-- 優惠卷輸入區 -->
          <div class="d-flex  justify-content-center align-items-center">
            <div class="input-group mb-2" style="width:50%">
              <input type="text" class="form-control" placeholder="請輸入優惠券號碼"
                v-model="couponCode">
              <button class="btn btn-outline-success" type="button" :disabled="couponActive" @click="useCoupon">
                <span v-if="couponActive">已套用</span>
                <span v-else>使用</span>
              </button>
            </div>
            <!-- 總計 套用優惠卷後的 -->
            <div class="d-flex justify-content-end align-items-center" style="width:50%">
              <p v-if="couponActive" class="fs-2 m-0">總計: $ {{ cartData.final_total }}</p>
              <p v-else></p>
            </div>
          </div>
        </div>
        <!-- 確認訂單 -->
        <div class="d-flex flex-column justify-content-center align-items-center mt-2">
          <p v-if="!couponActive"></p>
          <p v-else>以套用優惠卷</p>
          <p v-if="couponErr">優惠卷無效，請輸入正確的優惠卷。</p>
          <p v-else></p>
        </div>
          <router-link class="d-flex justify-content-center mb-4" to="/createorder">
            <button type="submit" class="col-12 col-md-8 btn btn-primary ">確認訂單</button>
          </router-link>
      </div>
      <!-- 購物車列表 - 商品列表 結束 -->
    </div>
  </div>
</div>
</template>

<script>

import emitter from '@/libs/emitter'

export default {
  data() {
    return {
      ready: false,
      cartData: {
        // length 無效關係 生命週期原因 所以這裡事先寫好結構
        carts: []
      },
      products: [],
      productsID: '',
      isLoadingItem: '',
      couponCode: '2022BOOK',
      couponActive: false,
      couponErr: false // true = 有錯誤
    }
  },
  methods: {
    // 以下購物車相關
    // 抓購物車資料
    getCart(){
      this.$http.get(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/cart`)
      .then((res) => {
        // 判定先前是否已經套用過優惠卷 - 如果 === = true = 還沒套用過優惠卷 ， false = 套用ing
        if (res.data.data.total === res.data.data.final_total){
          this.couponActive = false
        } else {
          this.couponActive = true
        }
        this.cartData = res.data.data
        this.ready = true
      })
      .catch((err) => {
        alert(err.data.message)
      })
    },
    // 更改購物車商品數量
    updataCartItem(item){
      const data = {
        product_id: item.id,
        qty: item.qty
      }
      this.isLoadingItem = item.id
      this.$http.put(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/cart/${item.id}`, { data })
      .then(() => {
        this.getCart()
        this.isLoadingItem = ''
        // 這是通知 致行 navbar 的
        emitter.emit('get-cart', () => {
          this.getCart()
        })
      })
      .catch((err) => {
        console.dir(err.data.message)
        alert(err.data.message)
      })
    },
    // 刪除購物車 單體
    removeCartItem(id){
      this.isLoadingItem = id
      this.$http.delete(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/cart/${id}`)
      .then((res) => {
        this.getCart()
        // 這是通知 致行 navbar 的
        emitter.emit('get-cart', () => {
          this.getCart()
        })
        this.isLoadingItem = ''
      })
      .catch((err) => {
        alert(err.data.message)
      })
    },
    // 刪除購物車 全部
    removeAllCartItem(){
      this.$http.delete(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/carts`)
      .then((res) => {
        this.getCart()
        // 這是通知 致行 navbar 的
        emitter.emit('get-cart', () => {
          this.getCart()
        })
      })
      .catch((err) => {
        alert(err.data.message)
      })
    },
    useCoupon(){ // 他會抓購物車的價錢
      const data = {
              code: this.couponCode
          }
      this.$http.post(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/coupon`, { data })
          .then(() => {
              this.couponActive = true
              this.couponErr = false
          })
          .catch((err) => {
              this.couponErr = true
              console.log('useCoupon', err.response.data.message)
              console.dir('useCoupon', err.response.data.message)
          })
    },
    createOrder(){
      const order = this.form
      this.$http.post(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/order`, { data: order })
      .then((res) => {
        this.$refs.form.resetForm()
        this.getCart()
        this.form.message = ''
        // 這是通知 致行 navbar 的
        emitter.emit('get-cart', () => {
          this.getCart()
        })
        this.$router.push(`/pay/${res.data.orderId}`)
      })
    }
  },
  mounted() {
    this.getCart()
  }
}
</script>

<style lang="sass">
  input::-webkit-outer-spin-button
  input::-webkit-inner-spin-button
    -webkit-appearance: none
    margin: 0
</style>
