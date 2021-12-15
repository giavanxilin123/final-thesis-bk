<template>
  <div class="cus-profile">
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">HOME</el-breadcrumb-item>
      <el-breadcrumb-item>ACCOUNT SETTING</el-breadcrumb-item
      >
    </el-breadcrumb>
    <section id="main">
      <header class="page-header">
        <div style="margin-bottom: 50px">Account Setting</div>
      </header>
         <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="Username">
              <el-input disabled v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="New password" prop="newPassword">
              <el-input type="password" v-model="form.newPassword"></el-input>
            </el-form-item>
            <el-form-item label="Confirm" prop="checkPass">
              <el-input type="password" v-model="form.checkPass"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button class="submitBtn" type="success" @click="changePassword('form')">Change Password</el-button>   
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
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the new Password'));
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the new Password again'));
        } else if (value !== this.form.newPassword) {
          callback(new Error('Two inputs don\'t match!'));
        } else {
          callback();
        }
      };

    return {
      form: {
        username: "",
        password: "",
        newPassword: "",
        checkPass: ""
      },
      rules: {
          password: [
            { required: true, validator: validatePass, trigger: 'blur' },
            {min: 8, trigger: 'blur', message: 'Password có ít nhất 8 kí tự'}
          ],
          newPassword: [
            { required: true, validator: validatePass, trigger: 'blur' },
            {min: 8, trigger: 'blur', message: 'New password có ít nhất 8 kí tự'}
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'blur' },
          ],
      }
    };
  },
  methods: {
    changePassword(formName) {
      this.$refs[formName].validate(async (valid) => {
          if (valid) {
             try{
                await this.$store.dispatch("changePassword", this.form)
                this.alertSuccess();
                this.$router.push('/')
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
          message: "Thay đổi password thành công!",
          type: "success"
        });
      }
  },

  async created() {
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