<template>
  <div class="create-product">
    <div class="back">
      <i
        @click="backProductsList"
        style="margin-left: 5px"
        class="el-icon-arrow-left"
        >Back to Products List</i
      >
    </div>
    <el-row class="muiGrid">
      <el-form
        :model="productForm"
        :rules="rules"
        ref="productForm"
        class="demo-ruleForm"
      >
        <el-col :span="16">
          <div class="general-inf">
            <div class="title">General Information</div>
            <el-form-item label="Product name" prop="name">
              <el-input v-model="productForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Quantity" prop="quantity">
              <el-input type="number" v-model="productForm.quantity"></el-input>
            </el-form-item>
          </div>

          <div class="price">
            <div class="title">Product Price</div>
            <el-form-item label="Product price" prop="price">
              <el-input type="number" v-model="productForm.price"></el-input>
            </el-form-item>
          </div>
          <el-button type="primary" @click="submitForm('productForm')"
            >Save</el-button
          >
        </el-col>
        <el-col :span="8">
          <div class="additional-inf">
            <div class="title">Additional Information</div>
            <el-form-item label="Product Type" prop="type">
              <el-select
                v-model="productForm.type"
                placeholder="Select product type"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <div style="padding: 20px">Product Image</div>
            <div style="padding: 20px">
              <input
                type="file"
                accept="image/*"
                @change="saveImg"
                style="margin-bottom: 10px"
              />
              <template v-if="productForm.img">
                <img :src="productForm.img" class="form-control-file" />
              </template>
              <div
                v-else
                class="upload-img"
                style="width: 100%; text-align: center"
                type="file"
                accept="image/*"
                @change="saveImg"
              >
                <i style="line-height: 300px" class="el-icon-plus"></i>
              </div>
            </div>
          </div>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      image: { size: 0 },
      productForm: {
        name: "",
        quantity: null,
        type: "",
        price: null,
        img: null,
      },
      options: [
        {
          value: "berries",
          label: "Berries",
        },
        {
          value: "milk",
          label: "Milk",
        },
        {
          value: "vegetables",
          label: "Vegetables",
        },
        {
          value: "nuts",
          label: "Nuts",
        },
        {
          value: "cereals",
          label: "Cereals",
        },
      ],

      rules: {
        name: [
          {
            required: true,
            message: "Please input Product name",
            trigger: "blur",
          },
          {
            min: 2,
            message: "Length should be larger than 1",
            trigger: "blur",
          },
        ],
        quantity: [
          { required: true, message: "Please input quantity", trigger: "blur" },
        ],
        price: [
          { required: true, message: "Please input price", trigger: "blur" },
        ],
        type: [
          { required: true, message: "Please select type", trigger: "change" },
        ],
      },
      imageUrl: "",
    };
  },

  methods: {
    backProductsList() {
      this.$router.go(-1);
    },
    saveImg(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.productForm.img = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid && this.image.size / 1024 < 60) {
          this.productForm.quantity = parseInt(this.productForm.quantity);
          this.productForm.price = parseFloat(this.productForm.price);
          await axios
            .put("https://gv-grocery-api.herokuapp.com/addProduct", {
              productForm: this.productForm,
            })
            .then((res) => {
              this.alertSuccess();
              console.log(res);
            })
            .catch((err) => this.alertErr(err.response.data));
          this.$router.push("/dashboard/product");
        } else {
          this.alertErr({ message: "File ảnh không được vượt quá 60KB" });
          return false;
        }
      });
    },
    alertErr(err) {
      console.log(err);
      this.$message({
        showClose: true,
        message: err.message || "Đã có lỗi xảy ra!",
        type: "error",
      });
    },
    alertSuccess() {
      this.$message({
        showClose: true,
        message: "Thêm sản phẩm thành công!",
        type: "success",
      });
    },
  },
};
</script>

<style scope>
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.create-product .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.create-product {
  height: 100vh;
  text-align: left;
}
.create-product .back {
  background-color: white;
  padding: 15px;
  color: #747c87;
}
.create-product .el-icon-arrow-left {
  cursor: pointer;
}
.create-product .el-icon-arrow-left::before {
  margin-right: 5px;
}
.create-product .general-inf {
  background-color: white;
  padding-bottom: 15px;
}

.create-product .additional-inf {
  background-color: white;
  padding-bottom: 15px;
}

.create-product .price {
  background-color: white;
  padding-bottom: 15px;
  margin: 20px 0;
}
.title {
  padding: 16px 24px;
  border-bottom: 1px solid #e5e5e5;
  font-weight: 500;
}
.create-product .muiGrid {
  margin: 20px auto;
  width: 95%;
}
.create-product .el-col-16 {
  padding-right: 10px;
}
.create-product .el-col-8 {
  padding-left: 10px;
}
.create-product .el-form-item {
  display: grid;
  margin-bottom: 5px;
  padding-bottom: 25px;
}
.create-product .el-form {
  padding: 10px;
}
</style>

<style>
.create-product .el-form-item__content {
  margin-left: 0 !important;
  padding: 0 20px;
}
.create-product .el-form-item__label {
  text-align: left;
  padding: 0 20px;
}
.create-product .el-form-item__error {
  padding: 10px 20px;
}
.form-control-file {
  max-width: 300px;
}
.upload-img {
  border: 1px black dashed;
  width: 300px;
  height: 300px;
}
</style>