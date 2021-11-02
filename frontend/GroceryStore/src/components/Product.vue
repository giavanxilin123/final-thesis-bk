<template>
  <div class="home">
    <div class="carousel">
      <div class="carousel-content">
        <div
          style="
            font-size: 55px;
            color: white;
            font-weight: 300;
            padding: 10px 0;
          "
        >
          Nuts & Cereals
        </div>
        <div style="color: white; max-width: 489px">
          These species are sometimes called "blueberries" and sold as blueberry
          jam or other products.
        </div>
        <el-button style="margin: 20px; padding: 15px 60px" type="success">
          Shop Now</el-button
        >
      </div>
    </div>

    <div style="padding: 30px 0" class="popular-product">
      <el-row :gutter="20">
        <el-col
          style="padding: 0 15px"
          v-for="(product, index) in allProducts"
          :key="index"
          :span="6"
        >
          <div class="product">
            <div class="product-img">
              <img v-if="product.img" :src="product.img" />
              <img v-else src="@/assets/No_image_available.jpg" alt="" />
            </div>
            <div class="product-name">{{ product.name }}</div>
            <div class="product-price">${{ product.price }}</div>
            <div class="product-buy">
              <el-button @click="addToCart(product)" type="success"
                >Add To Cart</el-button
              >
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productType: String,
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch("cart", {
        cart: {
          name: product.name,
          _id: product._id,
          price: product.price,
          num: 1,
          quantity: product.quantity,
          img: product.img
        },
      });
      this.alertSuccess();
    },
    alertErr(err) {
      this.$message({
        showClose: true,
        message: err.message || "Đã có lỗi xảy ra!",
        type: "error",
      });
    },
    alertSuccess() {
      this.$message({
        showClose: true,
        message: "Thêm vào giỏ hàng thành công!",
        type: "success",
      });
    },
  },

  created() {
    this.$store.dispatch("fetchProducts");
  },

  computed: {
    allProducts() {
      return this.$store.state.products.filter(
        (product) => product.type === this.productType
      );
    },
  },
};
</script>

<style scoped>
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
