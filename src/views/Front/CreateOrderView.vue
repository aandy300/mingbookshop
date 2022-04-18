<template>
<div class="container" style="min-height: 100vh">
  <div v-if="ready === true" class="row">
    <!-- card 付款狀態 -->
    <div v-if="cartData.carts.length === 0" class="d-flex justify-content-center my-5">
      <div class="col-md-6 card text-center" style="">
        <div class="card-body">
          <strong ><p class="m-0 text-primary" style="font-size: 2rem;">購物車目前沒有東西哦</p></strong>
          <router-link to="/products">
          <button type="button" class="col-4 btn btn-outline-primary mt-2">前去購買</button>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 購買步驟狀態 -->
    <div v-else class="row d-flex flex-nowrap justify-content-center align-items-center">
      <div style="max-width: 18rem;" class="col-3 d-none d-sm-block  text-balck bg-info my-5 mx-4 rounded">
        <div class="d-flex flex-column flex-nowrap justify-content-center align-items-center">
        <i class="bi bi-check2-circle mt-2" style="font-size:40px"></i>
          <p class="card-text text-center m-0">Step1</p>
          <p class="card-text text-center mb-2">確認訂單</p>
        </div>
      </div>
      <div style="max-width: 18rem;" class="col-3 d-none d-sm-block text-white bg-secondary my-5 mx-4 rounded">
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
      <div style="max-width: 18rem;" class="col-10 d-flex align-items-center d-block d-sm-none text-white bg-secondary my-5 mx-4 rounded">
        <div class="d-flex flex-column flex-nowrap justify-content-center align-items-center col-12">
          <i class="bi bi-dash-circle-dotted mt-2 text-center" style="font-size:40px;"></i>
          <p class="card-text text-center m-0">Step2</p>
          <p class="card-text text-center mb-2">建立訂單</p>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- 表單驗證 -->
      <div class="col-xl-12">
        <div class="my-3 row justify-content-center">
          <!-- @submit="createOrder" -->
          <Form @submit="createOrder" ref="form" class="col-md-7" v-slot="{ errors }" >
            <h4 class="d-none d-xl-block">收件人資訊</h4>
            <h4 class="d-xl-none">收件人資訊</h4>
            <hr>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
            <Field v-model="form.user.email" id="email" name="email" type="email" class="form-control"
                        :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="required|email"
                      ></Field>
              <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <Field v-model="form.user.name" id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                        placeholder="請輸入姓名" rules="required"></Field>
              <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
            </div>

            <div class="mb-3">
              <label for="tel" class="form-label">收件人電話</label>
              <Field v-model="form.user.tel" id="number" name="電話" type="number" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                        placeholder="請輸入電話" :rules="isPhone" style="-webkit-appearance: none;" ></Field>
              <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
            </div>

            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <Field v-model="form.user.address" id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                        placeholder="請輸入地址" rules="required" ></Field>
              <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
            </div>

            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea v-model="form.message" id="message" class="form-control" cols="30" rows="3" ></textarea>
            </div>
            <div class="text-end">
              <button type="submit" class="col-12 btn btn-primary" :disabled="Object.keys(errors).length > 0 || cartData.carts.length === 0 "
                      >送出訂單</button>
            </div>
          </Form>

        </div>
      </div>
      <!-- 表單驗證 結束 -->
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
      form: {
          user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      couponCode: '2022BOOK',
      couponActive: false,
      couponErr: true,
      couponTotal: 0
    }
  },
  components: {
  },
  methods: {
    // 以下購物車相關
    // 抓購物車資料
    getCart(){
      this.$http.get(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/cart`)
      .then((res) => {
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
          .then((res) => {
              this.couponActive = true
              this.couponErr = true
              this.couponTotal = res.data.data.final_total
              console.log('useCoupon', res.data, this.couponTotal)
          })
          .catch((err) => {
              this.couponErr = false
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
    },
    scrollToTop(){
      window.scrollTo(0, 0)
    },
    // 購物車相關結束
    // 以下表單驗證用
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼' // phoneNumber.test(外面表單輸入的值?) ? true的結果 : false的結果 嗎
    }
  },
  mounted() {
    this.getCart()
    this.scrollToTop()
  }
}
</script>

<style lang="sass">
  input::-webkit-outer-spin-button
  input::-webkit-inner-spin-button
    -webkit-appearance: none
    margin: 0
</style>
