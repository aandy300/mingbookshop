<template>
    <NavBar/>
    <RouterView/>
    <Footer/>
</template>

<script>
import NavBar from '@/components/NavbarView.vue'
import Footer from '@/components/FooterView.vue'
export default {
    components: {
    NavBar,
    Footer
  }
}
</script>

<style lang="sass">
  @import "./assets/stylesheets/all" // 已經是 lang="scss" 了 所以不用 .scss
  .bk
    // 主要顏色 深>淺 #7F5539 #9C6644 #B08968 #E6CCB2 #EDE0D4
    // background-color: #FFF6EE
  .card
    box-shadow: 0 0 1px rgb(10 15 20 / 5%), 0 0 10px rgb(10 10 20 / 10%)
    text-decoration: none
  .card:hover
    box-shadow: 0 0 2px rgb(10 16 20 / 25%), 0 0 25px rgb(10 16 20 / 15%)
    text-decoration: none
</style>
