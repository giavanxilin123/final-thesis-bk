<template>
  <div id="app">
    <div class="header">
      <div @click="goBack" class="logo">
        <img  src="./assets/logo.svg" alt="">
      </div>
      <div class="shopping-cart">
        <div class="icon">
          <img src="./assets/bag.png" alt="">
        </div>
        <div class="title">Shopping Cart</div>
      </div>
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
    // data() {
    //   return;
    // },

    methods: {
      goBack(){
        this.$router.push("/");
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

.header {
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.shopping-cart {
  display: flex;
  align-items: center;
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


</style>
