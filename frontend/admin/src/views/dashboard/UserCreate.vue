<template>
  <div class="create-user">
    <div class="back">
      <i
        @click="backToUserManagement"
        style="margin-left: 5px"
        class="el-icon-arrow-left"
        >Back to User Management</i
      >
    </div>
    <el-row class="muiGrid">
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        class="demo-ruleForm"
      >
        <el-col :span="16">
          <div class="general-inf">
            <div class="title">General Information</div>
            <el-form-item label="Name" prop="name">
              <el-input  v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item label="Phone" prop="phone">
              <el-input v-model.number="userForm.phone"></el-input>
            </el-form-item>
            
          </div>

          <el-button type="primary" @click="submitForm('userForm')"
            >Create User</el-button
          >
        </el-col>
            
        <el-col :span="8">
            <div class="user-account">
                <div class="title">Account Information</div>
                <el-form-item label="Username" prop="username">
                    <el-input  v-model="userForm.username"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input type="password" v-model="userForm.password"></el-input>
                </el-form-item>
                <el-form-item label="Confirm" prop="checkPass">
                    <el-input type="password" v-model="userForm.checkPass"></el-input>
                </el-form-item>
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
          if (this.userForm.checkPass !== '') {
            this.$refs.userForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'));
        } else if (value !== this.userForm.password) {
          callback(new Error('Two inputs don\'t match!'));
        } else {
          callback();
        }
      };
    return {
      userForm: {
        name: "",
        username: "",
        email: "",
        phone: "",
        role: "staff",
        password: "",
        checkPass: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input name",
            trigger: "blur",
          },
          {
            min: 2,
            message: "Length should be larger than 1",
            trigger: "blur",
          },
        ],
        username: [
          {required: true,  message: "Please input username", trigger: "blur" },
        ],
        email: [
          {required: true,  message: "Please input email", trigger: "blur" },
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
      },
      
    };
  },

  methods: {
    backToUserManagement() {
      this.$router.push('/dashboard/management')
    },
    
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await axios
            .post("http://localhost:5000/api.addUser", {
              userForm: this.userForm,
            })
            .then((res) => {
              this.alertSuccess();
              console.log(res);
            })
            .catch((err) => this.alertErr(err.response.data));
          this.$router.push("/dashboard/management");
        } else {
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
        message: "Thêm nhân viên thành công!",
        type: "success",
      });
    },
  },
};
</script>

<style scope>
.create-user .user-account {
  background-color: white;
  padding-bottom: 15px;
}
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
.create-user .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.create-user {
  height: 100vh;
  text-align: left;
}
.create-user .back {
  background-color: white;
  padding: 15px;
  color: #747c87;
}
.create-user .el-icon-arrow-left {
  cursor: pointer;
}
.create-user .el-icon-arrow-left::before {
  margin-right: 5px;
}
.create-user .general-inf {
  background-color: white;
  padding-bottom: 15px;
}

.create-user .additional-inf {
  background-color: white;
  padding-bottom: 15px;
}

.title {
  padding: 16px 24px;
  border-bottom: 1px solid #e5e5e5;
  font-weight: 500;
}
.create-user .muiGrid {
  margin: 20px auto;
  width: 95%;
}
.create-user .el-col-16 {
  padding-right: 10px;
}

.create-user .el-form-item {
  display: grid;
  margin-bottom: 5px;
  padding-bottom: 25px;
}
.create-user .el-form {
  padding: 10px;
}
</style>

<style>
.create-user .el-form-item__content {
  margin-left: 0 !important;
  padding: 0 20px;
}
.create-user .el-form-item__label {
  text-align: left;
  padding: 0 20px;
}
.create-user .el-form-item__error {
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