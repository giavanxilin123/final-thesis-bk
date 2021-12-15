<template>
  <div class="management">
    <div class="product_lists">
      <div class="card-header">
        <div class="icon"><i class="el-icon-box"></i></div>
        <div class="title">Products List</div>
      </div>
      <div class="card-body">
        <div style="position: relative" class="add">
          <el-button @click="addProductView" class="add-button"
            >ADD PRODUCT</el-button
          >
        </div>
        <!-- <div class="toolbar">
          <div>
            <div
              style="
                text-align: left;
                font-size: 12px;
                color: gray;
                paddxing: 5px;
              "
            >
              Per page
            </div>
            <el-select v-model="value" placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <el-input placeholder="Search ..." v-model="input"></el-input>
        </div> -->
        <div class="table-content">
          <div class="table-head">
            <el-row :gutter="20">
              <el-col :span="4"><div>Image</div></el-col>
              <el-col :span="6"><div>Name</div></el-col>
              <el-col :span="4"><div>Type</div></el-col>
              <el-col :span="4"><div>Price</div></el-col>
              <el-col :span="2"
                ><div>Quantity</div
              ></el-col>
              <el-col :span="4"
                ><div style="text-align: right">Actions</div></el-col
              >
            </el-row>
          </div>
          <div class="table-body">
            <el-row
              v-for="(product, index) in pagedTableData"
              :key="index"
              style="background-color: #f9f9f9"
              :gutter="20"
            >
              <el-col :span="4">
                <div class="avatar">
                  <div class="ava-img">
                    <img
                      v-if="product.img"
                      :src="product.img"
                    />
                    <img v-else src="../../assets/No_image_available.jpg" alt="" />
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="name">
                  {{ product.name }}
                </div>
              </el-col>
              <el-col :span="4">
                <div class="type">
                  {{ product.type }}
                </div>
              </el-col>
              <el-col :span="4">
                <div class="role">${{ product.price}}</div>
              </el-col>
              <el-col :span="2"><div>{{product.quantity}}</div></el-col>
              <el-col :span="4">
                <div class="action">
                  <div @click="updateProduct(product._id)" class="action-edit">
                    <i class="el-icon-edit"></i>
                  </div>
                  <div @click="deleteProduct(product._id)" class="action-delete">
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="table-footer">
            <el-pagination
              @current-change="setPage"
              layout="prev, pager, next"
              :total="allProducts.length"
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
    await this.$store.dispatch("fetchProducts");
  },
  methods: {
    addProductView() {
      this.$router.push("/dashboard/product-create");
    },
    setPage(val) {
      this.page = val;
    },
     deleteProduct(id) {
      this.$confirm('This will permanently delete product. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deleteProductById', id).then(()=>{
            this.$store.dispatch('fetchProducts');
            this.$message({
            type: 'success',
            message: 'Delete completed'
          }) //upload store fetch
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
      });
    },

    updateProduct(id) {
      this.$router.push({
        path: "/dashboard/product-update",
        query: {id: id}
      })
    }
  },
  computed: {
    allProducts() {
      return this.$store.state.products;
    },
    pagedTableData() {
      return this.allProducts.slice(
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
  border-bottom: 1px solid silver;
  padding: 5px 0;
  display: flex;
}
.management .action-edit {
  position: relative;
  margin-right: 5px;
  cursor: pointer;
}
.management .table-body .el-icon-edit {
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
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
.management .card-header .icon .el-icon-box {
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
.management .table-body .el-icon-delete {
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
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
.action {
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
.product_lists {
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