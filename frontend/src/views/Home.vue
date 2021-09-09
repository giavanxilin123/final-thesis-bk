<template>
  <div class="home">
    <div class="carousel">
        <div class="carousel-content">
          <div style = "font-size: 55px; color: white; font-weight: 300; padding: 10px 0"> Nuts & Cereals</div>
          <div style = "color: white; max-width: 489px">These species are sometimes called "blueberries" and sold as blueberry jam or other products.</div>
          <el-button style = "margin: 20px; padding: 15px 60px" type = "success"> Shop Now</el-button>
        </div>
    </div>

    <div style = "padding: 30px 0;" class="popular-product">
      <div style = "font-size: 32px; margin: 32px; " class ="product-title"> Popular products</div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="product">
            <div class="product-img">
              <img src="../assets/cherry.jpeg" alt="">
            </div>
            <div class="product-name">Cherry</div>
            <div class="product-price">$9.00</div>
            <div class="product-buy">
              <el-input-number v-model="num" controls-position="right"  :min="1" :max="10"></el-input-number>
              <el-button type = "success">Add To Cart</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="product">
            <div class="product-img">
              <img src="../assets/blackberry.jpeg" alt="">
            </div>
            <div class="product-name">Cherry</div>
            <div class="product-price">$9.00</div>
            <div class="product-buy">
              <el-input-number v-model="num" controls-position="right"  :min="1" :max="10"></el-input-number>
              <el-button type = "success">Add To Cart</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="product">
            <div class="product-img">
              <img src="../assets/blueberry.jpeg" alt="">
            </div>
            <div class="product-name">Cherry</div>
            <div class="product-price">$9.00</div>
            <div class="product-buy">
              <el-input-number v-model="num" controls-position="right"  :min="1" :max="10"></el-input-number>
              <el-button type = "success">Add To Cart</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="product">
            <div class="product-img">
              <img src="../assets/watermelon.jpeg" alt="">
            </div>
            <div class="product-name">Cherry</div>
            <div class="product-price">$9.00</div>
            <div class="product-buy">
              <el-input-number v-model="num" controls-position="right"  :min="1" :max="10"></el-input-number>
              <el-button type = "success">Add To Cart</el-button>
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
  // components: {
  //   HelloWorld
  // }
  data() {
      return {
        num: 1
      };
    },

  methods: {

  }

}
</script>

<style scoped>
  .el-row {
    margin: 0 auto !important;
    width: 80%;
  }
  .product-img img {
    width: 100%;
  }
  .product-name {
    font-weight: 500;
    margin: 15px 0;
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
    padding: 0 40px;
    margin-left: 15px;
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
