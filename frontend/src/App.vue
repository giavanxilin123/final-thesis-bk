<template>
  <div id="app">
    <div class="header">
      <div @click="goBack" class="logo">
        <img  src="./assets/logo.svg" alt="">
      </div>
      <div @click="dialogTableVisible = true" class="shopping-cart">
        <div class="icon">
          <img src="./assets/bag.png" alt="">
        </div>
        <div class="title">Shopping Cart</div>     
      </div>
      <el-dialog title="SHOPPING CART" :visible.sync="dialogTableVisible">
        <div class="cart-detail">
          <div class="product-img">
            <img src="./assets/cherry.jpeg" alt="">
          </div>
          <div class="product-detail">
            <div class="product-name">Cherry</div>
            <el-input-number v-model="num" size="small"  :min="1" :max="10"></el-input-number>
            <div class="product-price">$37.95</div>
          </div>
        </div>
        
        <span slot="footer" class="dialog-footer">
          <div class="total">
          <div class="type-fee">
            <div style= "text-align: left">
              <div>Subtotal</div>
              <div>Shipping</div>
              <div>Taxes</div>
            </div>
            <div style= "text-align: right">
              <div>$37.95</div>
              <div>Free</div>
              <div>$0.00</div>
            </div>
          </div>
          <div class = "sum">
            <div>TOTAL</div>
            <div>$37.95</div>
          </div>
          <el-button @click="checkOut" class="checkout" type="success">Proceed to checkout</el-button>
        </div>
        </span>
      </el-dialog>
    </div>
    <div id="nav">
      <router-link to="/berries">BERRIES</router-link> 
      <router-link to="/milk">MILK, EGGS & CHEESE</router-link>
      <router-link to="/vegetables">VEGETABLES</router-link> 
      <router-link to="/nuts">NUTS</router-link>
      <router-link to="/cereals">CEREALS</router-link>
    </div>
    
    <router-view/>
    
   
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num : 1,
        dialogTableVisible: false,
      }
    },

    methods: {
      goBack(){
        this.$router.push("/");
      },
      checkOut(){
        this.$router.push("/order")
        this.dialogTableVisible = false;
      }
    }

  }
</script>


<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  font-size: 16px;
}

#nav {
  padding: 20px;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
}

#nav a {
  font-weight:  500;
  text-decoration: none;
  padding: 0 30px;
  color: black;
}

#nav a.router-link-exact-active {
  color: #5ba718;
}


.header .dialog-fade-enter-active {
  animation: fade-in .5s;
}
.header .el-dialog {
    margin-top: 0 !important;
    margin: 0;
    position: absolute;
    right: 0;
    width: 24%;
    height: 100vh;
}
.header .el-dialog__header {
  background-color: #f4f4f4;
  padding: 25px;
  font-weight: 500;
} 
.header .el-dialog__title {
  font-size: 24px;
}
.header .el-dialog__footer {
  padding: 15px;
  background-color: #f4f4f4;
}
@keyframes fade-in {
   0% {
      transform: translateX(700px);
   }
   
   100% {
      transform: translateX(0);
   }
}
.product-detail .el-input-number{
  width: 110px;
}
</style>

<style scoped>
.cart {
  background-color: aquamarine;
  position: absolute;
  top: 0;
  right: 0;
}

.header {
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.shopping-cart {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.header .logo {
  cursor: pointer;
}

.header .logo img {
  width: 220px;
}

.header .icon img {
  width: 20px;
}

.header .title {
  margin-left: 5px;
  font-weight: 500;
}
.cart-detail {
  padding: 10px 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
}
.product-name {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}
.product-img{
  width: 90px;
}
.product-img img {
  width: 100%;
}
.product-detail {
  padding-left: 15px;
}
.total {
  font-size: 14px;
  font-weight: 500;
}
.type-fee {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0,0,0,.1);
  padding-bottom: 15px;
}
.sum {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  padding: 15px 0;
}
.checkout {
  width: 100%;
  padding: 18px;
  font-size: 16px;
}
.product-price {
  font-size: 20px;
  color: black;
  font-weight: 700;
  margin-top: 15px;
}
</style>
