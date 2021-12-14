<template>
  <div class="home">
    <div class="carousel">
        <div class="carousel-content">
          <div class="carousel-header"> Nuts & Cereals</div>
          <div class="carousel-body">These species are sometimes called "blueberries" and sold as blueberry jam or other products.</div>
          <el-button style = "margin: 20px; padding: 15px 60px" type="success"> Shop Now</el-button>
        </div>
    </div>

   
    <div style = "padding: 30px 0;" class="popular-product">
      <div style = "font-size: 32px; margin: 32px; " class ="product-title"> Popular products</div>

      <el-skeleton v-if ="!popularProducts.length" :rows="10" animated />
      <el-row v-else :gutter="20">
        <el-col class="product-col" v-for="(product, index) in popularProducts" :key="index" :xs="12" :sm="12" :lg="6" >
          <div class="product">
            <div class="product-img">
              <img v-if="product.img" :src="product.img">
              <img v-else src="../assets/No_image_available.jpg" alt="">
            </div>
            <div class="product-name">{{product.name}}</div>
            <div class="product-price">${{product.price}}</div>
            <div class="product-buy">
              <!-- <el-input-number v-model="min" controls-position="right" :min="1" :max="100"></el-input-number> -->
              <el-button @click="addToCart(product)" type = "success">Add To Cart</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  
  methods: {
    addToCart(product) {
      this.$store.dispatch('cart', {cart: {
        name: product.name,
        _id : product._id,
        price: product.price,
        num: 1,
        quantity: product.quantity,
        img: product.img
      }})
      this.alertSuccess()
    },
    alertErr(err) {
      this.$message({
        showClose: true,
        message:  err.message || "Đã có lỗi xảy ra!",
        type: "error"
      });
      },
      alertSuccess() {
        this.$message({
          showClose: true,
          message: "Thêm vào giỏ hàng thành công!",
          type: "success"
        });
      }
  },

  created(){
    this.$store.dispatch('fetchPopularProducts')
  },

  computed: {
    popularProducts() {
      return this.$store.state.popularProducts
    }
  }
}
</script>

<style scoped>
  @media (max-width: 480px) {
  .home .carousel .carousel-header{
    font-size: 34px;
  }
  .carousel-content {
    width: 80%;
  }
  .product-title {
    margin: 10px !important
  }
  .home .el-row {
    margin: 0 auto !important;
    width: 95% !important;
  }
  .product-col {
    padding: 5px !important
  }
}
  .product-col {
    padding: 0 15px;
  }
  .carousel-header {
    font-size: 55px; 
    color: white; 
    font-weight: 300; 
    padding: 10px 0;
  }
  .carousel-body {
    color: white; 
    max-width: 489px
  }
  .product {
    padding: 20px 0;
  }
  .home .el-row {
    margin: 0 auto !important;
    width: 80%;
  }
  .product-img img {
    width: 100%;
  }
  .product-name {
    font-weight: 500;
    margin: 15px 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    word-break: normal;
  }
  .product-price {
    font-size: 20px;
    font-weight: 600;
    margin: 5px 0;
  }
  .product-buy {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  .product-buy .el-button {
    padding: 12px 40px;
    width: 100%;
  }
  .carousel {
    position: relative;
    background: url(../assets/carousel.jpeg);
    height: 300px;
    background-size: cover;
    background-position: center;
    width: 100%;
  }
  .carousel-content {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
  }
</style>
