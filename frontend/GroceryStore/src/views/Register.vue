<template>
  <div class="cus-register">
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">HOME</el-breadcrumb-item>
      <el-breadcrumb-item>REGISTER</el-breadcrumb-item
      >
    </el-breadcrumb>
    <section id="main">
      <header class="page-header">
        <div style="margin-bottom: 50px">Create an account</div>
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
            <el-form-item label="Username" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="Confirm" prop="checkPass">
              <el-input type="password" v-model="form.checkPass"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button class="submitBtn" type="success" @click="register('form')">Save</el-button>   
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
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'));
        } else if (value !== this.form.password) {
          callback(new Error('Two inputs don\'t match!'));
        } else {
          callback();
        }
      };
    return {
      form: {
        fullname: "",
        username: "",
        password: "",
        phone: "",
        emaiL: "",
        checkPass: ""
      },
      rules: {
          fullname: [
             { required: true, message: 'Please input fullname', trigger: 'blur' },
          ],
          username: [
             { required: true, message: 'Please input username', trigger: 'blur' },
          ],
          password: [
            { required: true, validator: validatePass, trigger: 'blur' },
            {min: 8, trigger: 'blur', message: 'Password có ít nhất 8 kí tự'}
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'blur' },
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
    register(formName) {
      this.$refs[formName].validate(async (valid) => {
          if (valid) {
             try{
                await this.$store.dispatch("register", this.form)
                .then(() => {
                  this.alertSuccess();
                  this.$router.push("/login");
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
          message: "Đăng ký thành công!",
          type: "success"
        });
      }
  },
};
</script>

<style>
@media (max-width: 480px) {
  .cus-register .el-form-item__label{
    text-align: left;
    height: 40px !important;
  }
  .cus-register .el-form-item .el-form-item__content{
    margin-left: 0 !important;
  }
  .cus-register .el-form-item{
    margin-bottom: 10px !important;
  }

}
  .cus-register .el-input__inner {
    height: 55px;
  }
  .cus-register .el-form-item__label {
    height: 55px;
    line-height: 55px;
  }
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