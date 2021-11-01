<template>
  <div>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">HOME</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/history' }"
        >HISTORY</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/history/product-list' }"
        >PRODUCT LIST</el-breadcrumb-item
      >
    </el-breadcrumb>
    <section id="main">
      <header class="page-header">Order Details</header>
      <div v-if="tableData.length>0">
        <el-table ref="filterTable" :data="tableData" style="width: 100%">
          <el-table-column prop="_id" label="Order Id" width="210">
          </el-table-column>
          <el-table-column prop="name" label="Name"> </el-table-column>
          <el-table-column prop="num" label="Quantity" width="150">
          </el-table-column>
          <el-table-column prop="price" label="Unit price" width="150">
          </el-table-column>
          <el-table-column label="Total Price" width="150">
            <template slot-scope="props">
              {{ Math.round(props.row.num * props.row.price * 100) / 100 }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <p>No Data</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    tableData() {
      let id = this.$route.query.id;
       return this.$store.state.orderHistory.filter((o) => o._id == id).length >
        0
        ? this.$store.state.orderHistory.filter((o) => o._id == id)[0].order
        : [];
    },
  },
  async created() {
    await this.$store.dispatch("getOrderHistory", this.$store.state.customer.username);
    // console.log(this.$store.state.orderHistory)
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
  margin: 20px;
  font-size: 26px;
  line-height: 26px;
  background: #fff;
  font-family: "Lato", Arial, sans-serif;
  font-weight: 100;
}
</style>