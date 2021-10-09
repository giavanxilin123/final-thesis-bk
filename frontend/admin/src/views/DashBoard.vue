<template>
  <div class="dashboard"> 
    <el-row>
      <el-col class="menu" :span="4">
        <div class="overlay">
          <div style="padding: 20px; font-size: 18px; font-weight: 600; text-align: left"><i style="margin-right: 20px; font-size: 25px" class="el-icon-menu"></i>DASHBOARD</div>
          <div class="divider"></div>
          <div class=user>{{user.name}}</div>
          <div class="divider"></div>
          <div class="sidebar-content" @click = "userManagementRoute"><i class="el-icon-s-custom icon"></i>User Management</div>
          
          <div class="sidebar-content" @click = "orderManagementRoute">
            <el-badge style="margin-right: 20px" :value="countNewOrder" class="item">
            <i style="margin-right: 0" class="el-icon-s-order icon"></i>
          </el-badge>Order Management</div>
          <div class="sidebar-content" ><i class="el-icon-map-location icon"></i>Optimize Routing Solver</div>
          <div @click ="logOut" class="sidebar-content" ><i class="el-icon-switch-button icon"></i>Log Out</div>
        </div>
      </el-col>

      <el-col style="background-color: #eee" :span="20">
        <!-- <div class="nav">
          <el-badge :value="2" class="item">
            <i class="el-icon-message-solid icon"></i>
          </el-badge>
          <i style="margin-left: 30px" class="el-icon-s-custom icon"></i>
        </div> -->
        <router-view/>
      </el-col>
    </el-row>
  </div>
    
</template>

<script>
export default {
    data(){
        return {
           
        }
    },
     methods: {
      async userManagementRoute() {
        this.$router.push("/dashboard/management").catch(error => {
          if (error.name !== 'NavigationDuplicated' && !error.message.includes('Avoided redundant navigation to current location')) {
            console.log(error)
          }
        })
      },
      async orderManagementRoute() {
         this.$router.push("/dashboard/order").catch(error => {
          if (error.name !== 'NavigationDuplicated' && !error.message.includes('Avoided redundant navigation to current location')) {
            console.log(error)
          }
        })
      },
      logOut() {
        this.$store.dispatch('logOut');
        this.$router.push('/')
      },
    },
    computed: {
      user(){
          return this.$store.state.user
        },
      orderList() {
          return this.$store.state.orders;
      },
      countNewOrder(){
        return this.orderList.filter(x => x.status == "New").length
        
      },
      
    },

    async mounted() {
        await this.$store.dispatch('fetchOrders');
    },  
    
}
</script>

<style>
    
</style>

<style scoped>
  .user {
    padding: 20px;
    text-align: left;
  }
  .nav {
    text-align: right;
    margin: 0 auto;
    width: 95%;
    padding: 20px 0
  }
  .nav .icon {
    font-size: 20px;
    cursor: pointer;
  }
  .sidebar-content .icon {
    margin-right: 20px;
    font-size: 25px
  }
  .menu {
     height: 100vh;
     background: url(../assets/sidebar.jpeg);
     color: white;
     background-position: bottom;
     background-size: cover;
     font-size: 14px;
  }
  .sidebar-content {
    padding: 20px;
    cursor: pointer;
    text-align: left;
  }
  .sidebar-content:hover {
    background: rgba(0,0,0,0.2);
  }
  .overlay {
    background: rgba(0,0,0, 0.7);
    height: 100vh;
  }
  .divider {
    border: 1px solid hsla(0,0%,70.6%,0.3);
    margin: 0 15px;
  }
</style>