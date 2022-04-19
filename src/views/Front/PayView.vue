<template>
<div v-if="ready" class="container">
  <div class="row d-flex justify-content-center align-items-center">
    <!-- 付款狀態 new -->
    <div class="row d-flex flex-nowrap justify-content-center align-items-center">
      <div style="max-width: 18rem;" class="col-3 d-none d-sm-block card- text-balck bg-info my-5 mx-4 rounded">
        <div class="d-flex flex-column flex-nowrap justify-content-center align-items-center">
        <i class="bi bi-check2-circle mt-2" style="font-size:40px"></i>
          <p class="card-text text-center m-0">Step1</p>
          <p class="card-text text-center mb-2">確認訂單</p>
        </div>
      </div>
      <div style="max-width: 18rem;" class="col-3 d-none d-sm-block card- text-balck bg-info my-5 mx-4 rounded">
        <div class="d-flex flex-column flex-nowrap justify-content-center align-items-center">
          <i class="bi bi-check2-circle mt-2" style="font-size:40px"></i>
          <p class="card-text text-center m-0">Step2</p>
          <p class="card-text text-center mb-2">建立訂單</p>
        </div>
      </div>
      <div v-if="order.is_paid" style="max-width: 18rem;" class="col-3 d-none d-sm-block card- text-white bg-secondary my-5 mx-4 rounded">
        <div class="d-flex flex-column flex-nowrap justify-content-center align-items-center">
          <i class="bi bi-check2-circle mt-2" style="font-size:40px"></i>
          <p class="card-text text-center m-0">Step3</p>
          <p class="card-text text-center mb-2">付款</p>
        </div>
      </div>
      <div v-else style="max-width: 18rem;" class="col-3 d-none d-sm-block card- text-white bg-secondary my-5 mx-4 rounded">
        <div class="d-flex flex-column flex-nowrap justify-content-center align-items-center">
          <i class="bi bi-dash-circle-dotted mt-2" style="font-size:40px"></i>
          <p class="card-text text-center m-0">Step3</p>
          <p class="card-text text-center mb-2">付款</p>
        </div>
      </div>
      <!-- for rwd 顯示 單個 購買狀態 -->
      <div v-if="order.is_paid" style="max-width: 18rem;" class="col-10 d-flex flex-column align-items-center d-block d-sm-none card- text-white bg-secondary my-5 mx-4 rounded">
          <i class="bi bi-check2-circle mt-2" style="font-size:40px"></i>
          <p class="card-text text-center m-0">Step3</p>
          <p class="card-text text-center mb-2">付款</p>
      </div>
      <div v-else style="max-width: 18rem;" class="col-10 d-flex flex-column align-items-center d-block d-sm-none card- text-white bg-secondary my-5 mx-4 rounded">
          <i class="bi bi-dash-circle-dotted mt-2" style="font-size:40px"></i>
          <p class="card-text text-center m-0">Step3</p>
          <p class="card-text text-center mb-2">付款</p>
      </div>
    </div>
    <!-- card 付款狀態 -->
    <div class="d-flex justify-content-center">
      <div class="col-6 border border-dark text-center" style="">

        <div class="card-body">
          <strong v-if="order.is_paid"><p class="m-0" style="font-size: 2rem; color:green;">已付款</p></strong>
          <strong v-else><p class="m-0" style="font-size: 2rem; color:red;">尚未付款</p></strong>
        </div>

      </div>
    </div>
    <!-- 表單資訊 -->
    <div class="container mt-5">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2">
        <!-- 商品資訊 -->
        <div class="col mb-9">
          <h4>訂單資訊</h4>
          <table class="table"><!--  table-striped -->
            <!-- tag -->
            <thead>
              <tr>
                <th style="max-width:350px;">品名</th>
                <th nowrap="nowrap" style="">數量</th>
                <th nowrap="nowrap" style="">小計</th>
              </tr>
            </thead>
            <!-- 內容 -->
            <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td class="d-flex">
                    {{ item.product.title }}
                  </td>
                  <td>
                    {{ item.qty }}
                  </td>
                  <td>
                    {{ item.total }}
                  </td>
                </tr>
            </tbody>
            <!-- 總金額 -->
            <tfoot>
                  <div class="position-relative">
                    <div class="position-absolute start-50">
                      <div class="d-flex justify-content-end align-items-center flex-nowrap">
                        <div class="d-flex flex-nowrap fs-2 fw-bolder text-end" style="white-space: nowarp; word-break: keep-all;">總金額: </div>
                        <div class="text-end" style="color:red; font-size:1.5rem"><strong>{{ order.total }}</strong></div>
                      </div>
                    </div>
                  </div>
            </tfoot>

          </table>
        </div>
        <!-- 訂單細節 -->
        <div class="col mb-5">
          <h4>訂單細節</h4>
                    <table class="table">
                      <tbody>
                        <!--  -->
                        <tr>
                          <th style="width: 100px">下訂時間</th>
                          <td>{{ new Date(order.create_at * 1000).toISOString().split('T').toString().slice(0, -5).replace(',', '-') }}</td>
                        </tr>
                        <tr>
                          <th style="width: 100px">訂單編號</th>
                          <td>{{ order.id }}</td>
                        </tr>
                        <tr>
                          <th>付款狀態</th>
                          <td>
                            <strong v-if="order.is_paid" class="text-success">已付款</strong>
                            <span v-else class="text-muted">尚未付款</span>
                          </td>
                        </tr>
                        <tr>
                          <th style="width: 100px">收件人名稱</th>
                          <td>{{ order.user.name }}</td>
                        </tr>
                        <tr>
                          <th style="width: 100px">收件人信箱</th>
                          <td>{{ order.user.email }}</td>
                        </tr>
                        <tr>
                          <th style="width: 100px">收件人電話</th>
                          <td>{{ order.user.tel }}</td>
                        </tr>
                        <tr>
                          <th style="width: 100px">收件人地址</th>
                          <td>{{ order.user.address }}</td>
                        </tr>
                        <tr>
                          <th style="width: 100px">留言</th>
                          <td>{{ order.message }}</td>
                        </tr>
                        <tr>
                          <th style="width: 100px">訂單總金額</th>
                          <td style="color:red; text-align: end; font-size:1.5rem"><strong>{{ order.total }}</strong></td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- 確認付款 -->
                    <div class="">
                      <button type="button" class="btn btn-primary col-12" :disabled="order.is_paid" @click="payOrder()">確認付款</button>
                    </div>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      ready: false,
      order: {
        create_at: '',
        is_paid: '',
        message: '',
        total: 0,
        user: {}
      }
    }
  },
  components: {
  },
  methods: {
    getOrders(){
      const id = this.$route.params.id
      // const { id } = this.$route.params  // 解構的寫法
      this.$http(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/order/${id}`)
      .then(res => {
        console.log(res)
          this.order = res.data.order
          this.ready = true
      })
    },
    payOrder(){
      const id = this.$route.params.id
      this.$http.post(`${process.env.VUE_APP_url}/api/${process.env.VUE_APP_path}/pay/${id}`)
      .then(() => {
        this.getOrders()
        this.scrollToTop()
      })
      .catch(err => {
          console.dir(err)
      })
    },
    scrollToTop(){
      window.scrollTo(0, 0)
    }
  },
  mounted() {
    this.getOrders()
  }
}
</script>
