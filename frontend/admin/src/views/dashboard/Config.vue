<template>
  <div class="update-product">
    
    <el-row class="muiGrid">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        class="demo-ruleForm"
      >
        <el-col :span="8">
          <div class="general-inf">
            <div class="title">Settings</div>
            <el-form-item label="Run Engine Duration" prop="durationRunEngine">
              <el-input type="number" v-model.number="form.durationRunEngine"></el-input>
            </el-form-item>
            <el-form-item label="Goods Preparation Duration" prop="durationPreparation">
              <el-input type="number" v-model.number="form.durationPreparation"></el-input>
            </el-form-item>
          </div>

          <el-button type="primary" @click="submitForm('form')"
            >Save</el-button
          >
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
      image: null,
      form: {
        durationRunEngine: "",
        durationPreparation: "",
      },

      rules: {
        durationPreparation: [
          { required: true, message: "Please input goods preparation time", trigger: "blur" },
        ],
        durationRunEngine: [
          { required: true, message: "Please input duration to run engine", trigger: "blur" },
        ],
      },
      
    };
  },

  methods: {
    backProductsList() {
      this.$router.go(-1);
    },
    submitForm(formName) { 
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await axios
            .put(`https://gv-grocery-api.herokuapp.com/api.config`, {duration: this.form})
            .then(() => {
              this.alertSuccess();
            })
            .catch((err) => this.alertErr(err.response.data));
        } else {
          return false;
        }
      });
    },
    alertErr(err) {
      console.log(err)
      this.$message({
        showClose: true,
        message: err.message || "Đã có lỗi xảy ra!",
        type: "error",
      });
    },
    alertSuccess() {
      this.$message({
        showClose: true,
        message: "Cài đặt thành công!",
        type: "success",
      });
    },
  },
  async created() {
      await this.$store.dispatch('config')
      this.form.durationRunEngine = this.config.durationRunEngine
      this.form.durationPreparation = this.config.durationPreparation
  },
  computed: {
    config() {
        return this.$store.state.config[0]
    }
  }

};
</script>
<style scope>


.update-product {
  height: 100vh;
  text-align: left;
}
.update-product .back {
  background-color: white;
  padding: 15px;
  color: #747c87;
}
.update-product .el-icon-arrow-left {
  cursor: pointer;
}
.update-product .el-icon-arrow-left::before {
  margin-right: 5px;
}
.update-product .general-inf {
  background-color: white;
  padding-bottom: 15px;
}

.update-product .additional-inf {
  background-color: white;
  padding-bottom: 15px;
}

.update-product .price {
  background-color: white;
  padding-bottom: 15px;
  margin: 20px 0;
}
.title {
  padding: 16px 24px;
  border-bottom: 1px solid #e5e5e5;
  font-weight: 500;
}
.update-product .muiGrid {
  margin: 20px auto;
  width: 95%;
}
.update-product .el-col-16 {
  padding-right: 10px;
}
.update-product .el-col-8 {
  padding-left: 10px;
}
.update-product .el-form-item {
  display: grid;
  margin-bottom: 5px;
  padding-bottom: 25px;
}
.update-product .el-form {
  padding: 10px;
}
</style>

<style>
.update-product .el-form-item__content {
  margin-left: 0 !important;
  padding: 0 20px;
}
.update-product .el-form-item__label {
  text-align: left;
  padding: 0 20px;
}
.update-product .el-form-item__error {
  padding: 10px 20px;
}
.form-control-file {
  max-width: 300px;
}
</style>