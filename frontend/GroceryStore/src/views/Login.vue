<template>
  <div>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">HOME</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/login' }"
        >LOGIN TO ACCOUNT</el-breadcrumb-item
      >
    </el-breadcrumb>
    <section id="main">
      <header class="page-header">
        <h1>Log in to your account</h1>
      </header>
      <el-form
        :model="form"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-input placeholder="Username" v-model="form.username"></el-input>
        <div>
          <el-input
            placeholder="Password"
            type="password"
            v-model="form.password"
            autocomplete="off"
            @keyup.enter.native="logIn"
          ></el-input>
        </div>
        <div class="other-options">
          <router-link to="/">Forgot your password?</router-link>
          <router-link to="/register">No account? Create one here</router-link>
        </div>
        <el-button
          class="submitBtn"
          type="success"
          @click="logIn"
          >Sign in</el-button
        >
      </el-form>
      <footer class="page-footer">
      
      </footer>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async logIn() {
      try{
          await this.$store.dispatch("logIn", this.form);
          this.alertSuccess();
          this.$router.push("/");
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
  width: 40%;
  margin: 0 auto;
}
.page-header {
  font-size: 26px;
  line-height: 26px;
  background: #fff;
  font-family: "Lato", Arial, sans-serif;
  font-weight: 100;
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
}
</style>