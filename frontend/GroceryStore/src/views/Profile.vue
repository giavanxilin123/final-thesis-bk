<template>
  <div class="cus-profile">
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">HOME</el-breadcrumb-item>
      <el-breadcrumb-item>PROFILE</el-breadcrumb-item
      >
    </el-breadcrumb>
    <section id="main">
      <header class="page-header">
        <div style="margin-bottom: 50px">Customer Profile</div>
      </header>
         <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="Fullname" prop="fullname">
              <el-input v-model="form.fullname"></el-input>
            </el-form-item>
             <el-form-item label="Email" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="Phone (+84)" prop="phone">
              <el-input v-model.number="form.phone"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button class="submitBtn" type="success" @click="updateProfile('form')">Save</el-button>   
            </el-form-item>
         </el-form>

   
      <footer class="page-footer">
      
      </footer>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Please input the phone'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'));
          } else {
            callback();
          }
        }, 1000);
      };

    return {
      form: {
        fullname: "",
        phone: "",
        email: "",
        username: ""
      },
      rules: {
          fullname: [
             { required: true, message: 'Please input fullname', trigger: 'blur' },
          ],
          phone: [
            { required: true, validator: checkPhone, trigger: 'blur' },
          ],
          email:  [
            { required: true, message: 'Please input email', trigger: 'blur' },
          ],
      }
    };
  },
  methods: {
    updateProfile(formName) {
      this.$refs[formName].validate(async (valid) => {
          if (valid) {
             try{
                await this.$store.dispatch("updateProfile", this.form)
                .then(() => {
                  this.alertSuccess();
                })
                
              }catch(err){
                this.alertErr(err)
              }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
       
    },
    
    alertErr(err) {
      this.$message({
        showClose: true,
        message:  err.message || "Đã có lỗi xảy ra!",
        type: "error"
      });
      },
      alertSuccess() {
        this.$message({
          showClose: true,
          message: "Chỉnh sửa profile thành công!",
          type: "success"
        });
      }
  },

  async created() {
      this.form.fullname = this.$store.state.customer.fullname
      this.form.phone = this.$store.state.customer.phone
      this.form.email = this.$store.state.customer.email
      this.form.username = this.$store.state.customer.username
  }
};

</script>

<style>
@media (max-width: 480px) {
  .cus-profile .el-form-item__label{
    text-align: left;
    height: 40px !important;
  }
  .cus-profile .el-form-item .el-form-item__content{
    margin-left: 0 !important;
  }
  .cus-profile .el-form-item{
    margin-bottom: 10px !important;
  }

}
  .cus-profile .el-input__inner {
    background: #f1f1f1;
    color: #acaaa6;
  }
  .cus-profile .el-input__inner:focus {
    background: white !important;
    color: #acaaa6;
    border-color:#5ba718
  }
  /* .cus
  -profile .el-form-item__label {
    height: 55px;
    line-height: 55px;
  } */
</style>

<style scoped>
@media (max-width: 480px) {
  #main {
    width: 90% !important;
  }
  .page-header {
    font-size: 36px !important;
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
  width: 40%;
  margin: 0 auto;
}
.page-header {
  font-size: 36px;
  line-height: 26px;
  background: #fff;
  font-family: "Lato", Arial, sans-serif;
  padding: 60px 0 30px
}
.other-options {
  justify-content: space-between;
  display: flex;
}
.other-options > a {
  text-decoration: none;
  color: #878787;
}
.demo-ruleForm .el-input {
  margin: 10px 0;
}
.submitBtn {
  color: #fff;
  border-radius: 5px;
  padding: 12px 30px 16px;
  line-height: 24px;
  vertical-align: middle;
  font-size: 16px;
  min-width: 200px;
  background-color: #5ba718;
  margin: 35px;
}
</style>