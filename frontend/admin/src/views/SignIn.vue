<template>
  <div class="login-bg">
    <div class="overlay">
      <div class="logo">
        <img class="logo-svg" src="../assets/logo.svg" alt="">
      </div>
      
      <div class="login-form">
        <div class="third-login">
          <div style="margin-top: 15px">Log in</div>
          <div class=icon>
            <i style="margin: 0 15px" class="fab fa-facebook-square"></i>
            <i style="margin: 0 15px" class="fab fa-twitter"></i>
            <i style="margin: 0 15px" class="fab fa-google-plus-g"></i>
          </div>
        </div>
        <div class="input-login">
          <el-input
          placeholder="Username"
          prefix-icon="el-icon-user-solid"
          v-model="form.username">
        </el-input>
        <el-input
          @keyup.enter.native="logIn"
          type="password"
          placeholder="Password"
          prefix-icon="el-icon-lock"
          v-model="form.password">
        </el-input>
        <el-button  @click="logIn">LOGIN</el-button>
        </div>
        
      </div>
    </div>
  </div>
    
</template>

<script>
export default {
  data(){
    return {
      form:{
        username:"",
        password: ""
      }  
    }
  },
  methods: {
    async logIn() {
      try{
          await this.$store.dispatch("logIn", this.form);
          this.alertSuccess();
          this.$router.push("/dashboard/management");
        }catch(err){
          this.alertErr(err)
        }
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
          message: "Đăng nhập thành công!",
          type: "success"
        });
      }
  }
}
</script>

<style>
  .login-bg .input-login .el-button {
    margin-top: 40px;
    border: none !important;
    color: #4caf50;
    letter-spacing: 1px;
  }
  .login-bg.input-login .el-button:hover{
    background-color: white;
  }
</style>

<style scope>
  .login-bg .icon {
    padding: 40px;
    margin: 0 10px;
  }
  
  .login-bg .third-login {
    background: linear-gradient(60deg,#66bb6a,#43a047);
    width: 90%;
    border-radius: 5px;
    color: white;
    position: absolute;
    top: -20px;
    right: 50%;
    transform: translateX(50%);
    font-size: 20px;
  }
  .login-bg .login-form .el-input {
    margin: 10px;
    width: 90%;
  }
  .login-bg {
    background: url(../assets/login.jpeg);
    background-position: center;
    background-size: cover;
    height: 100vh;
    width: 100%;
  }
  .login-bg .overlay {
    background-color: rgba(0,0,0,0.5);
    height: 100vh;
    width: 100%;
    position: relative;
  }
  .login-bg .logo {
    width: 250px;
    padding: 20px;
  }
  .login-bg .logo-svg{
     filter:   invert(1) sepia(1) saturate(1);
  }
  .login-bg .logo img {
    width: 100%;
  }
  .login-bg .login-form {
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    background-color: white;
    width: 350px;
    height: 400px;
    border-radius: 5px;
  }
  
  .login-bg .input-login{
    position: absolute;
    bottom: 8%;
  }
</style>
