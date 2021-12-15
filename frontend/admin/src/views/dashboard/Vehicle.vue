<template>
  <div class="management">
    <div class="vehicle_lists">
      <div class="card-header">
        <div class="icon"><i class="el-icon-truck"></i></div>
        <div class="title">Vehicle List</div>
      </div>
      <div class="card-body">
        <div style="position: relative" class="add">
          <!-- <el-button @click="addProductView" class="add-button"
            >ADD VEHICLE</el-button
          > -->
        </div>
       
        <div class="table-content">
          <div class="table-head">
            <el-row :gutter="20">
              
              <el-col :span="2"><div>Name</div></el-col>
              <el-col :span="3"><div>Capacity</div></el-col>
              <el-col :span="3"><div>Driver</div></el-col>
              <el-col :span="4"
                ><div>Return Time</div
              ></el-col>
              <el-col :span="6"
                ><div >OrderID</div
              ></el-col>
              <el-col :span="3"
                ><div>Map</div></el-col
              >
              <el-col :span="3"
                ><div style="text-align: right">Status</div></el-col
              >
            </el-row>
          </div>
          <div class="table-body">
            <el-row
              v-for="(vehicle, index) in pagedTableData"
              :key="index"
              style="background-color: #f9f9f9"
              :gutter="20"
            >
              
              <el-col :span="2">
                <div class="name">
                  {{ vehicle.name }}
                </div>
              </el-col>
              <el-col :span="3">
                <div class="capacity">
                  {{ vehicle.capacity }}
                </div>
              </el-col>
              <el-col :span="3">
                <div class="driver">
                    {{vehicle.driver}}
                </div>
                </el-col>
              <el-col :span="4">
                  <div v-if="vehicle.status =='available'">None</div>
                  <div v-else>{{formatTime(vehicle.timeBackToDepot)}}</div>
              </el-col>
              <el-col :span="6">
                  <div  v-if="vehicle.status =='available'">None</div>
                  <div v-else>
                      <div @click="orderInformation(order)" style="padding: 2px 5px;cursor:pointer; margin: 5px 0; background: gray; color: white; font-weight: 500; letter-spacing: 1px" v-for="(order, index) in vehicle.orderId_list" :key="index">
                          {{order}}
                      </div>
                  </div>
                  </el-col>
              <el-col :span="3">
                <div class="map">
                <div  v-if="vehicle.status =='available'">
                    None
                </div>
                  <div @click="mapView(vehicle._id)" v-else>
                       <i style="font-size: 25px; cursor: pointer" class="el-icon-map-location"></i>
                  </div>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="status">
                <div style="width: 10px; height: 10px; border-radius: 50%; background: grey"  v-if="vehicle.status =='available'">
                  
                </div>
                  <div style="width: 10px; height: 10px; border-radius: 50%; background: #67c23a" v-else>
                       
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="table-footer">
            <el-pagination
              @current-change="setPage"
              layout="prev, pager, next"
              :total="vehicle.length"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // options: [
      //   {
      //     value: "5",
      //     label: "5",
      //   },
      //   {
      //     value: "10",
      //     label: "10",
      //   },
      //   {
      //     value: "25",
      //     label: "25",
      //   },
      //   {
      //     value: "50",
      //     label: "50",
      //   },
      // ],
      // value: "",
      // input: "",
      page: 1,
      pageSize: 10,
    };
  },
  async created() {
    await this.$store.dispatch("vehicle");
  },
  methods: {
    setPage(val) {
      this.page = val;
    },
    mapView(id) {
      this.$router.push({
        path: "/dashboard/optimize-route",
        query : {id: id}
      })
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
    }
  },
  computed: {
    vehicle() {
      return this.$store.state.vehicle;
    },
    
    pagedTableData() {
      return this.vehicle.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
  },
};
</script>

<style>
.management .table-footer {
  padding-top: 20px;
}
.management .el-pagination {
  text-align: right;
}
.management .table-body .el-row {
  padding: 5px 0;
  display: flex;
}

.management .icon {
  height: 60px;
  width: 60px;
  background-color: #4caf50;
  border-radius: 3px;
  position: absolute;
  left: 15px;
  top: -15px;
}
.management .card-header .icon .el-icon-truck {
  color: white;
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  font-size: 25px;
}
.management .action-delete {
  position: relative;
}

.management .table-body .el-col {
  display: flex;
  align-items: center;
}
.management .card-body .el-button {
  background-color: #9c27b0;
  color: white;
  border: none;
  font-size: 12px;
  padding: 10px 30px;
}
.management .card-body .el-input {
  width: 200px;
}
.management .toolbar input {
  border: none;
  border-bottom: 1px solid silver;
}
</style>

<style scoped>
.status {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
.action-edit {
  background-color: #00bcd4;
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.action-delete {
  background-color: #f44336;
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.table-head {
  padding: 10px 0;
}
.table-body {
  font-size: 14px;
}
.ava-img {
  width: 40px;
}
.ava-img img {
  width: 100%;
  border-radius: 50%;
}
.card-header {
  position: relative;
}
.add {
  height: 40px;
}
.card-body {
  padding: 20px;
}
.card-body .el-button {
  position: absolute;
  right: 0;
}
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.table-content {
  padding: 15px 0;
  text-align: left;
}
.title {
  width: 270px;
  padding: 20px 0;
  font-size: 18px;
}
.management {
  background-color: transparent;
  height: 100vh;
  position: relative;
}
.vehicle_lists {
  background-color: white;
  border-radius: 5px;
  width: 95%;
  border: 1px solid #eee;
  position: absolute;
  top: 60px;
  right: 50%;
  transform: translateX(50%);
}
</style>