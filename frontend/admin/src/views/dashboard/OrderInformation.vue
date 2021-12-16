<template>
  <div class="order-inf">
    <div class="back">
      <i
        @click="backToVehiclePage"
        style="margin-left: 5px; cursor: pointer"
        class="el-icon-arrow-left"
        >Back</i
      >
    </div>
    <el-row class="muiGrid">
        <el-descriptions title="Order Detail" direction="vertical" :column="3" border>
            <el-descriptions-item label="Fullname">{{orderDetail.fullname}}</el-descriptions-item>
            <el-descriptions-item label="Telephone">(+84) {{orderDetail.phone}}</el-descriptions-item>
            <el-descriptions-item label="Email" :span="2">{{orderDetail.email}}</el-descriptions-item>
            <el-descriptions-item label="Username">{{orderDetail.username}}</el-descriptions-item>
            
           
            <el-descriptions-item label="Address">{{orderDetail.address}}</el-descriptions-item>
             <el-descriptions-item label="Price">
                <el-tag size="small">${{orderDetail.total}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Orders">
                <div style='font-weight: 600' v-for="(o,i) in  orderDetail.order" :key="i" class="text item">
                   {{o.name}} ({{o.num}})
                </div>
            </el-descriptions-item>
           
        </el-descriptions>
    </el-row>
  </div>
</template>

<script>
export default {
    async created() {
        const {id} = this.$route.query;
        await this.$store.dispatch('getOrderById', id)
    },

    methods: {
        backToVehiclePage() {
            this.$router.go(-1);
        },
    },

    computed: {
        orderDetail() {
            return this.$store.state.orderById[0]
        }
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