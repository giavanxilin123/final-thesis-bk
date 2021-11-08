<template>
  <div class="history-order">
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">HOME</el-breadcrumb-item>
      <el-breadcrumb-item>HISTORY</el-breadcrumb-item>
    </el-breadcrumb>
    <section id="main">
      <header class="page-header">
        <div>Order history</div>
      </header>
      <div>
        <p style="text-align: left">Here are the orders you've placed since your account was created.</p>
        <el-table ref="filterTable" :data="tableData" style="width: 100%">
          <el-table-column prop="_id" label="Order Id" width="220">
          </el-table-column>
          <el-table-column
            prop="date"
            label="Date"
            sortable
            column-key="date"
          >
          </el-table-column>
          <el-table-column prop="total" label="Total Price" width="150">
          </el-table-column>
          <el-table-column prop="status" label="status" width="150">
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.status === 'Completed'
                    ? 'success'
                    : scope.row.status === 'New'
                    ? 'primary'
                    : 'warning'
                "
                disable-transitions
                >{{ scope.row.status }}
                </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="order" label="Product List" width="200">
            <template slot-scope="scope">
              <el-button
                type="info"
                round
                @click="getProductList(scope.row._id)"
                >Details</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div v-for="o in tableData" :key="o._id" class="table-xs">
          <div class="code">
            <div>{{o._id}}</div>
            <div @click="getProductList(o._id)"><i style="cursor: pointer" class="el-icon-circle-plus-outline"></i></div>
            </div>
          <div class="date">{{o.date}}</div>
          <div class="total">${{o.total}}</div>
          <el-tag
                :type="
                  o.status === 'Completed'
                    ? 'success'
                    : o.status === 'New'
                    ? 'primary'
                    : 'warning'
                "
                disable-transitions
                >{{ o.status }}</el-tag
              >
          
          
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getOrderHistory", this.customer.username);
  },
  computed: {
    tableData() {
      return this.$store.state.orderHistory;
    },
    customer() {
      return this.$store.state.customer;
    },
  },
  methods: {
    getProductList(id) {
      this.$router.push({
        path: "/history/product-list",
        query: { id: id },
      });
    },
  },
};
</script>

<style scoped>
@media (max-width: 480px) {
  .history-order .el-table {
    display: none;
  }
  #main {
    width: 90% !important;
  }
  .table-xs {
    display: block !important;
  }
}
.breadcrumb {
  padding: 13px 15%;
  display: flex;
  align-items: center;
  height: 52px;
  background-color: #f2f4f9;
}
#main {
  display: block;
  font-size: 16px;
  line-height: 26px;
  background: #fff;
  font-family: "Lato", Arial, sans-serif;
  width: 60%;
  margin: 0 auto;
}
.page-header {
  padding: 20px;
  font-size: 30px;
  line-height: 26px;
  background: #fff;
  font-family: "Lato", Arial, sans-serif;
  font-weight: 100;
}
.table-xs {
  text-align: left;
  color: #878787;
  padding: 25px 0;
  display: none;
}
.code {
    background-color: #878787;
    color: white;
    padding: 5px 10px;
    font-size: 18px;
    letter-spacing: 1px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.date {
  padding: 5px 10px;
}
.total {
  padding: 5px 10px;
}
</style>