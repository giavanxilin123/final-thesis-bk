<template>
  <div class="dashboard"> 
    <el-row>
      <el-col class="menu" :span="4">
        <div class="overlay">
          <div style="padding: 20px; font-size: 18px; font-weight: 600; text-align: center"><img style="width: 30px" src="../assets/gv.png" alt="">
            GRAIN STORE</div>
          <div class="divider"></div>
          <div class=user>{{user.name}}</div>
          <div class="divider"></div>
          <div class="sidebar-content"><i class="el-icon-menu icon"></i>Dashboard</div>
          <div class="sidebar-content" @click ="userManagement"><i class="el-icon-s-custom icon"></i>User Management</div>
          
          <div class="sidebar-content" @click ="orderManagement">
            <el-badge style="margin-right: 20px" :value="countNewOrder" :hidden="countNewOrder === 0" class="item">
              <i style="margin-right: 0" class="el-icon-s-order icon"></i>
            </el-badge>Order Management
          </div>
          <div class="sidebar-content" @click ="productManagement"><i class="el-icon-box icon"></i>Product Management</div>
          <!-- <div class="sidebar-content" @click ="optimizeRoute" ><i class="el-icon-map-location icon"></i>Optimize Routing Solver</div> -->
          <div class="sidebar-content" @click ="toVehiclePage" >
            <el-badge style="margin-right: 20px" :value="numberVehicleActive" :hidden="numberVehicleActive === 0" class="item">
              <i style="margin-right: 0" class="el-icon-truck icon"></i>
            </el-badge>Vehicle Management
          </div>
          <div v-if="user.role == 'admin'" class="sidebar-content" @click ="toConfigPage" ><i class="el-icon-setting icon"></i>Configuration</div>

          <div @click ="logOut" class="sidebar-content" ><i class="el-icon-switch-button icon"></i>Log Out</div>
        </div>
      </el-col>

      <el-col style="background-color: #eee; overflow: auto" :span="20">
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
      async userManagement() {
        this.$router.push("/dashboard/management").catch(error => {
          if (error.name !== 'NavigationDuplicated' && !error.message.includes('Avoided redundant navigation to current location')) {
            console.log(error)
          }
        })
      },
      async orderManagement() {
        await this.$router.push("/dashboard/order").catch(error => {
          if (error.name !== 'NavigationDuplicated' && !error.message.includes('Avoided redundant navigation to current location')) {
            console.log(error)
          }
        })
      },

      async productManagement() {
        await this.$router.push("/dashboard/product").catch(error => {
          if (error.name !== 'NavigationDuplicated' && !error.message.includes('Avoided redundant navigation to current location')) {
            console.log(error)
          }
        })
      },

      async optimizeRoute() {
        await this.$router.push("/dashboard/optimize-route").catch(error => {
          if (error.name !== 'NavigationDuplicated' && !error.message.includes('Avoided redundant navigation to current location')) {
            console.log(error)
          }
        })
      },

      async toConfigPage() {
        await this.$router.push("/dashboard/config").catch(error => {
          if (error.name !== 'NavigationDuplicated' && !error.message.includes('Avoided redundant navigation to current location')) {
            console.log(error)
          }
        })
      },

      async toVehiclePage() {
        await this.$router.push("/dashboard/vehicle").catch(error => {
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
      numberVehicleActive() {
        return this.$store.state.vehicle
        .filter(v => v.status == "unavailable").length
      }
    },

    async mounted() {
        await this.$store.dispatch('fetchOrders');
        await this.$store.dispatch('vehicle');
    },  
    
}
</script>

<style>
  .dashboard .el-badge__content {
  background-color: #4caf50;
}
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