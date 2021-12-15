<template>
  <div class="order-inf">
    <div class="back">
      <i
        @click="backToVehiclePage"
        style="margin-left: 5px; cursor: pointer"
        class="el-icon-arrow-left"
        >Back to Order Management Page</i
      >
    </div>
    <el-row class="muiGrid">
        <el-descriptions style="margin: 10px 0" v-for="(c, index) in orderCollection" :key="index"  direction="vertical" :column="3" border>
            <el-descriptions-item label="Time Run Optimization Tool">{{formatTime(c.timeRunEngine)}}</el-descriptions-item>
            <el-descriptions-item label="OrderID">
                <div v-for="(o, i) in c.id_list" :key="i">
                <div style="cursor: pointer" @click ="orderInformation(o)">{{o}}</div>
                </div>
            </el-descriptions-item>
        </el-descriptions>
    </el-row>
  </div>
</template>

<script>
export default {
    async created() {
        await this.$store.dispatch('getOrderCollection')
    },

    methods: {
        backToVehiclePage() {
            this.$router.go(-1);
        },
        formatTime(time) {
            let h = String(Math.floor(time / 60))
            let m = String(time % 60)
            if (m.length == 1) {
                m = '0' + m;
            }
            return h + ":" + m;
        },
        orderInformation(id) {
            this.$router.push({
            path: "/dashboard/order-information",
            query: {id: id}
        })
        },
    },

    computed: {
        orderCollection() {
            let order = this.$store.state.orderCollection.sort((a, b) => {
                return a.timeRunEngine - b.timeRunEngine
            })
            return order
        },
           
    }
};
</script>

<style scope>

 .text {
    font-size: 14px;
  }

  .item {
    padding: 10px 0;
  }

  .box-card {
    width: 480px;
  }

.order-inf {
  height: 100vh;
  text-align: left;
}
.order-inf .back {
  background-color: white;
  padding: 15px;
  color: #747c87;
}

.order-inf .muiGrid {
  margin: 20px auto;
  width: 95%;
}

</style>

<style>


</style>