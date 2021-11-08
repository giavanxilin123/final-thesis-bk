<template>
  <div id="app">
      <div class="header">
      <div @click="table = true" class="bar">
         <i style="font-size: 30px" class="fas fa-bars"></i>
      </div>
     
      <el-drawer
        style="text-align: left; font-size: 13px"
        :visible.sync="table"
        direction="ltr"
        size="60%">
        <div @click="toPage('./berries')" style="padding: 10px 30px; display: flex; align-items: center; justify-content: space-between"><span>BERRIES</span> <i class="el-icon-arrow-right"></i></div> 
        <div @click="toPage('./milk')" style="padding: 10px 30px; display: flex; align-items: center; justify-content: space-between"><span>MILK, EGGS & CHEESE</span> <i class="el-icon-arrow-right"></i></div> 
        <div @click="toPage('./vegetables')" style="padding: 10px 30px; display: flex; align-items: center; justify-content: space-between"><span>VEGETABLES</span> <i class="el-icon-arrow-right"></i></div> 
        <div @click="toPage('./nuts')" style="padding: 10px 30px; display: flex; align-items: center; justify-content: space-between"><span>NUTS</span> <i class="el-icon-arrow-right"></i></div> 
        <div @click="toPage('./cereals')" style="padding: 10px 30px; display: flex; align-items: center; justify-content: space-between"><span>CEREALS</span> <i class="el-icon-arrow-right"></i></div> 
        <div v-if="Object.keys(this.customer).length === 0" @click="toLoginMobile" style="padding: 10px 30px; background: #f8f9fc">Sign in</div>
        <div v-else >
          <div style="padding: 10px 30px; background: #f8f9fc" >{{customer.username}}</div>
          <div @click="toOrderHistory" style="padding: 10px 30px; background: #f8f9fc" >Order History <i class="el-icon-s-order"></i></div>
          <div @click="logOut" style="padding: 10px 30px; background: #f8f9fc" >Log Out <i class="el-icon-switch-button"></i></div>
        </div>
      </el-drawer>
      
      <div @click="goBack" class="logo">
        <img src="./assets/logo.svg" alt="" />
      </div>
      
      <div style="display: flex">
        <div @click="dialogTableVisible = true" class="shopping-cart">
          <el-badge
            :value="cart.length"
            :hidden="cart.length === 0"
            class="item"
          >
            <div class="icon">
              <img src="./assets/bag.png" alt="" />
            </div>
          </el-badge>
          <div class="title">Shopping Cart</div>
        </div>
        <div
          v-if="Object.keys(this.customer).length === 0"
          @click="toLoginPage"
          class="login"
        >
          <div class="icon">
            <img src="./assets/login.png" alt="" />
          </div>
        </div>

        <el-dropdown v-else class="menu-user" trigger="click">
          <span style="cursor: pointer" class="el-dropdown-link">
            {{ customer.username
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              @click.native="toOrderHistory"
              style="cursor: pointer"
              icon="el-icon-s-order"
              >Order History</el-dropdown-item
            >
            <el-dropdown-item
              @click.native="logOut"
              style="cursor: pointer"
              icon="el-icon-switch-button"
              >Log Out</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-dialog title="SHOPPING CART" :visible.sync="dialogTableVisible">
        <div v-if="cart.length">
          <div v-for="c in cart" :key="c._id" class="cart-detail">
            <div class="product-img">
              <img v-if="c.img" :src="c.img" />
              
              <img v-else src="@/assets/No_image_available.jpg" alt="" />
            </div>
            <div class="product-detail">
              <div class="product-name">{{ c.name }}</div>
              <el-input-number
                v-model="c.num"
                size="small"
                :min="1"
                :max="c.quantity"
              ></el-input-number>
              <!-- c.price.tofixed(2)  code  ngu qua -->
              <div class="product-price">${{ c.price }}</div>  
            </div>
            <div>
              <i @click="removeOrderLine(c._id)" class="el-icon-close"></i>
            </div>
          </div>

          <span slot="footer" class="dialog-footer">
            <div class="total">
              <div class="type-fee">
                <div style="text-align: left">
                  <div class="fee-detail">Subtotal</div>
                  <div class="fee-detail">Shipping</div>
                  <div class="fee-detail">Taxes (5%)</div>
                </div>
                <div style="text-align: right">
                  <div class="fee-detail">${{ subTotal }}</div>
                  <div class="fee-detail">Free</div>
                  <div class="fee-detail">
                    ${{ ((subTotal * 5) / 100).toFixed(2) }}
                  </div>
                </div>
              </div>
              <div class="sum">
                <div>TOTAL</div>
                <div>${{ ((subTotal * 105) / 100).toFixed(2) }}</div>
              </div>
              <el-button @click="checkOut" class="checkout" type="success"
                >Proceed to checkout</el-button
              >
            </div>
          </span>
        </div>

        <div style="font-size: 16px" v-else>
          There are no more items in your cart
        </div>
      </el-dialog>
    </div>
    <div id="nav">
      <router-link to="/berries">BERRIES</router-link>
      <router-link to="/milk">MILK, EGGS & CHEESE</router-link>
      <router-link to="/vegetables">VEGETABLES</router-link>
      <router-link to="/nuts">NUTS</router-link>
      <router-link to="/cereals">CEREALS</router-link>
    </div>

    <router-view />
  </div>
</template>

<script>

export default {
  data() {
    return {
      table: false,
      num: 1,
      dialogTableVisible: false,
    };
  },

  methods: {
    async toLoginPage() {
      await this.$router.push("/login").catch((error) => {
        if (
          error.name !== "NavigationDuplicated" &&
          !error.message.includes(
            "Avoided redundant navigation to current location"
          )
        ) {
          console.log(error);
        }
      });
    },
    async toLoginMobile() {
      await this.$router.push("/login").catch((error) => {
        if (
          error.name !== "NavigationDuplicated" &&
          !error.message.includes(
            "Avoided redundant navigation to current location"
          )
        ) {
          console.log(error);
        }
      });
      this.table = false
    },
    async goBack() {
      await this.$router.push("/").catch((error) => {
        if (
          error.name !== "NavigationDuplicated" &&
          !error.message.includes(
            "Avoided redundant navigation to current location"
          )
        ) {
          console.log(error);
        }
      });
    },
    checkOut() {
      let access_token = JSON.parse(localStorage.getItem("cus_accessToken"));
      if (!access_token) {
        this.alertErr({ message: "You must login to order!" });
      } else {
        this.$router.push("/order");
      }
      this.dialogTableVisible = false;
    },
    removeOrderLine(id) {
      this.$store.dispatch("removeOrderLine", id);
    },
    async toOrderHistory() {
      await this.$router.push("/history").catch((error) => {
        if (
          error.name !== "NavigationDuplicated" &&
          !error.message.includes(
            "Avoided redundant navigation to current location"
          )
        ) {
          console.log(error);
        }
      });
      this.table = false
    },
    async logOut() {
      this.$store.dispatch("logOut");
      await this.$router.push("/").catch((error) => {
        if (
          error.name !== "NavigationDuplicated" &&
          !error.message.includes(
            "Avoided redundant navigation to current location"
          )
        ) {
          console.log(error);
        }
      });
      this.table = false
      this.alertSuccess()
    },
    alertErr(err) {
      this.$message({
        showClose: true,
        message: err.message || "Đã có lỗi xảy ra!",
        type: "error",
      });
    },
    async toPage(name){
      await this.$router.push(name).catch((error) => {
        if (
          error.name !== "NavigationDuplicated" &&
          !error.message.includes(
            "Avoided redundant navigation to current location"
          )
        ) {
          console.log(error);
        }
      })
      this.table = false;
    },
    alertSuccess() {
        this.$message({
          showClose: true,
          message: "Đăng xuất thành công!",
          type: "success"
        });
      }
  },

  computed: {
    cart() {
      return this.$store.state.cart;
    },
    subTotal() {
      return this.$store.state.cart
        .map((c) => c.price * c.num)
        .reduce((a, b) => a + b, 0)
        .toFixed(2);
    },
    customer() {
      return this.$store.state.customer;
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
@media (max-width: 480px) {
  .header .el-dialog {
    width: 75% !important;
  }
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
  font-weight: 500;
  text-decoration: none;
  padding: 0 30px;
  color: black;
}

#nav a.router-link-exact-active {
  color: #5ba718;
}

.header .dialog-fade-enter-active {
  animation: fade-in 0.5s;
}
.header .el-dialog {
  margin-top: 0 !important;
  margin: 0;
  position: absolute;
  right: 0;
  width: 24%;
  height: 100%;
}
.header .el-dialog__header {
  background-color: #f4f4f4;
  padding: 25px;
  font-weight: 500;
}

.header .el-dialog__body {
  background-color: white;
}
.header .el-dialog__title {
  font-size: 24px;
}
.header .el-dialog__footer {
  padding: 15px;
  background-color: #f4f4f4;
}
.header .el-badge__content {
  background-color: #67c23a;
}


@keyframes fade-in {
  0% {
    transform: translateX(700px);
  }

  100% {
    transform: translateX(0);
  }
}
.product-detail .el-input-number {
  width: 110px;
}
</style>

<style scoped>
@media (max-width: 480px) {
  
  .header .login {
    display: none;
  }
  .header .title {
    display: none;
  }
  .header .icon img {
    width: 35px !important;
  }
  .header .logo img {
    width: 180px !important;
  }
  #nav {
    display: none;
  }
  .bar {
    display: block !important;
  }
  .menu-user {
    display: none;
  }
}

/* .header {
  position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    z-index: 5000;
    background: white;
} */
.bar {
  cursor: pointer;
  display: none;
}
.menu-user {
  line-height: 26px;
  margin-left: 20px;
}
.login {
  margin-left: 20px;
  cursor: pointer;
}
.header .el-icon-close {
  color: white;
  padding: 2px;
  border-radius: 50%;
  background-color: gray;
  margin-left: 50px;
  cursor: pointer;
}
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
  margin-left: 10px;
  font-weight: 500;
}
.cart-detail {
  padding: 20px 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  border-bottom: 1px solid #f4f4f4;
}
.product-name {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}
.product-img {
  width: 90px;
}
.product-img img {
  width: 100%;
}
.product-detail {
  padding-left: 15px;
  width: 45%;
}
.total {
  font-size: 14px;
  font-weight: 500;
}
.type-fee {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 15px;
}
.fee-detail {
  font-size: 16px;
  font-weight: 500;
  padding: 5px;
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
