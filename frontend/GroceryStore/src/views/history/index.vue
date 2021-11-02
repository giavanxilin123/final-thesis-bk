<template>
  <div>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">HOME</el-breadcrumb-item>
      <el-breadcrumb-item>HISTORY</el-breadcrumb-item>
    </el-breadcrumb>
    <section id="main">
      <header class="page-header">
        <h1>Order history</h1>
      </header>
      <div>
        <p>Here are the orders you've placed since your account was created.</p>
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
                >{{ scope.row.status }}</el-tag
              >
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
  font-size: 26px;
  line-height: 26px;
  background: #fff;
  font-family: "Lato", Arial, sans-serif;
  font-weight: 100;
}
</style>