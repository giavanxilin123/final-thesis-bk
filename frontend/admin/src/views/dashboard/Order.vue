<template>
  <div class="order-management">
    <div class="user_lists">
      <div class="card-header">
        <div class="icon"><i class="el-icon-document"></i></div>
        <div class="title">Orders List</div>
      </div>
      <div class="card-body">
        <!-- <div class="toolbar">
          <el-input placeholder="Search ..." v-model="input"></el-input>
        </div> -->
        <div style="position: relative" class="add">
          <el-button @click="toAutomaticOrderCollection"
            >VIEW AUTOMATIC ORDER COLLECTION</el-button
          >
        </div>
        <div class="table-content">
          <div class="table-head">
            <el-row style="font-size: 13px" :gutter="20">
              <!-- <el-col :span="1"><div>STT</div></el-col> -->
              <el-col :span="4"><div>Code</div></el-col>
              <el-col :span="4"><div>Name</div></el-col>
              <el-col :span="2"><div>Quantity</div></el-col>
              <el-col :span="5"><div>Address</div></el-col>
              <el-col :span="4"
                ><div>Created At</div
              ></el-col>
              <el-col :span="2"
                ><div>PromiseTime</div
              ></el-col>
              <!-- <el-col :span="2">Prepare <i @click="sortOrder" style="cursor: pointer" class="el-icon-sort-up
"></i></el-col> -->
              <el-col :span="2"><div>Status</div></el-col>
              <el-col style="padding: 0 !important" :span="1"
                ><div style="text-align: right;">Actions</div></el-col
              >
            </el-row>
          </div>
          <div class="table-body">
            <el-row
              v-for="(order, index) in pagedTableData"
              :key="index"
              style="background-color: #f9f9f9"
              :gutter="20"
            >
              
              <el-col style="padding-right: 0 !important" :span="4">
                <div>
                  {{ order._id }}
                </div>
              </el-col>
              <el-col :span="4">
                <div class="name">
                  {{ order.fullname }}
                </div>
              </el-col>
              <el-col :span="2">
                <div class="product">
                  {{ order.order.map(x=>x.num).reduce((a,b)=> a+b, 0) }}
                </div>
              </el-col>
              <el-col :span="5">
                <div class="address">
                  {{ order.address }}
                </div>
              </el-col>
              <el-col :span="4"
                ><div style="font-size: 12px">{{ new Date(order.date).toLocaleString() }}</div></el-col
              >
              <el-col :span="2"
                ><div style="font-size: 12px">{{ order.promiseTime }}</div></el-col
              >
              <!-- <el-col :span="2"
                ><div style="font-size: 12px">{{ formatTime(preparatory(order.promiseTime, order.duration_delivery)) }}</div></el-col
              > -->
              <el-col :span="2" style="text-align: center">
                <el-tag style="font-size: 10px" v-if="order.status === 'Completed'" type="success">{{
                  order.status
                }}</el-tag>
                <el-tag style="font-size: 10px" v-if="order.status === 'New'" type="primary">{{
                  order.status
                }}</el-tag>
                <el-tag style="font-size: 10px" v-if="order.status === 'Progressing'" type="warning">{{
                  order.status
                }}</el-tag>
                <el-tag style="font-size: 10px" v-if="order.status === 'Delivering'" type="info">{{
                  order.status
                }}</el-tag>
              </el-col>
              <el-col :span="1">
                <div class="action">
                  <div @click="orderInformation(order._id)" class="action-edit">
                    <i class="el-icon-s-order"></i>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="table-footer">
            <el-pagination
              @current-change="setPage"
              layout="prev, pager, next"
              :total="orderList.length"
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
      sort: false,
      page: 1,
      pageSize: 10,
    };
  },
  methods: {
    async changeStatus(id, status) {
      this.$store.dispatch("updateStatus", { id: id, status: status });
      await this.$store.dispatch("fetchOrders");
    },
    preparatory(promiseTime, duration){
      let hour = +promiseTime.split(":")[0]
      let minute = +promiseTime.split(":")[1]
      let preparatory = hour * 60 + minute - duration - 2;
      // return String(Math.floor(preparatory / 60)) +":" + String(preparatory % 60)
      return preparatory
    },

    formatTime(time) {
        let h = String(Math.floor(time / 60))
        let m = String(time % 60)
        if (m.length == 1) {
            m = '0' + m;
        }
        return h + ":" + m;
    },
    sortOrder() {
      this.sort = true;
    },
     orderInformation(id) {
        this.$router.push({
        path: "/dashboard/order-information",
        query: {id: id}
      })
    },
    toAutomaticOrderCollection() {
      this.$router.push('/dashboard/order-collection')
    },
    setPage(val) {
      this.page = val;
    }
  },
  async created() {
    await this.$store.dispatch("fetchOrders");
  },
  computed: {
    orderList() {
      let orders = this.$store.state.orders
      if(this.sort == true){
          orders.sort((a,b) => {
            return this.preparatory(a.promiseTime, a.duration_delivery) - this.preparatory(b.promiseTime, b.duration_delivery)
          })
      }
      return orders;
    },
    pagedTableData() {
      return this.orderList.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
  },
  // watch: {
  //   '$store.state.orders' : function() {
  //     console.log(this.$store.state.orders)
  //   }
  // }
};
</script>

<style>
.order-management .table-footer {
  padding-top: 20px;
}
.order-management .el-pagination {
  text-align: right;
}
.order-management .table-body .el-row {
  border-bottom: 1px solid silver;
  padding: 5px 0;
  display: flex;
}
.order-management .action-edit {
  position: relative;
  margin-right: 5px;
  cursor: pointer;
}
.order-management .table-body .el-icon-s-order {
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
}
.order-management .icon {
  height: 60px;
  width: 60px;
  background-color: #4caf50;
  border-radius: 3px;
  position: absolute;
  left: 15px;
  top: -15px;
}
.order-management .card-header .icon .el-icon-document {
  color: white;
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  font-size: 25px;
}
.order-management .action-changeStatus {
  position: relative;
}
.order-management .table-body .el-icon-upload2 {
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
}
.order-management .table-body .el-icon-download {
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
}
.order-management .table-body .el-col {
  display: flex;
  align-items: center;
}
.order-management .card-body .el-button {
  background-color: #9c27b0;
  color: white;
  border: none;
  font-size: 12px;
  padding: 10px 30px;
}
.order-management .card-body .el-input {
  width: 200px;
}
.order-management .toolbar input {
  border: none;
  border-bottom: 1px solid silver;
}
</style>

<style scoped>
/* .action {
  display: flex;
  width: 100%;
  justify-content: flex-end;
} */
.order-management .el-tag {
  width: 100%;
}
.action-edit {
  background-color: rgb(103, 194, 58);
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.action-changeStatus {
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
  font-size: 13px;
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
.order-management {
  background-color: transparent;
  height: 100vh;
  position: relative;
}
.user_lists {
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