<template>
    <div class = "management">
        <div class="user_lists">
            <div class="card-header">
                <div class="icon"><i class="el-icon-s-custom"></i></div>
                <div class="title">Users List</div>
            </div>
            <div class="card-body">
                <!-- <div style="position: relative" class="add">
                    <el-button class= "add-button">ADD USER</el-button>
                </div> -->
                <!-- <div class="toolbar">
                    <div>
                        <div style='text-align: left; font-size: 12px; color: gray; padding:5px'>Per page</div>
                        <el-select v-model="value" placeholder="Select">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <el-input placeholder="Search ..." v-model="input"></el-input>
                </div> -->
                <div class="table-content">
                    <div class="table-head">
                        <el-row :gutter="20">
                            <el-col :span="4"><div>STT</div></el-col>
                            <el-col :span="4"><div>Name</div></el-col>
                            <el-col :span="4"><div>Email</div></el-col>
                            <el-col :span="4"><div>Role</div></el-col>
                            <el-col :span="4"><div>Created At <i class="el-icon-top"></i></div></el-col>
                            <el-col :span="4"><div style="text-align: right">Actions</div></el-col>
                        </el-row>
                    </div>
                    <div class="table-body">
                        <el-row v-for="(user,index) in allUsers" :key="index" style = "background-color: #f9f9f9" :gutter="20">
                            <el-col :span="4">
                                <div class= "avatar">
                                    <div class="ava-img">
                                        {{index+1}}
                                    </div>  
                                </div>
                                </el-col>
                            <el-col :span="4">
                                <div class= "name">
                                    {{user.name}}
                                </div>
                            </el-col>
                            <el-col :span="4">
                                <div class= "email">
                                    {{user.email}}
                                </div>
                            </el-col>
                            <el-col :span="4">
                                <div class= "role">
                                    {{user.role}}
                                </div>
                            </el-col>
                            <el-col :span="4"><div>2021-08-26 10:27:23</div></el-col>
                            <el-col :span="4">
                                <div class="action">
                                    <div class="action-edit">
                                        <i class="el-icon-edit"></i>
                                    </div>
                                    <div class="action-delete">
                                        <i class="el-icon-delete"></i>
                                    </div>
                                </div>
                            </el-col>
                        </el-row> 
                    </div>
                    <div class="table-footer">
                        <el-pagination
                            :page-size="10"
                            layout="prev, pager, next"
                            :total="20">
                        </el-pagination>
                        
                    </div>
                </div>
            </div>
        </div>
      </div>
</template>

<script>

export default {
    // data(){
    //     return {
            
    //      }
    // },

    async created() {
        await this.$store.dispatch('fetchUser');
    },

    methods: {
        
    },
    
    computed: {
        allUsers() {
            return this.$store.state.allUsers
        }
    },
    
    

}
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
    .management .card-header .icon .el-icon-s-custom {
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
        width: 200px
    }
    .management .toolbar input {
        border: none ;
        border-bottom: 1px solid silver;
    }
</style>

<style scoped>
    .action{
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }
    .action-edit {
        background-color: #00bcd4;
        color:white;
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
    .table-head{
        padding: 10px 0;
    }
    .table-body {
        font-size: 14px;
    }
    .ava-img{
        width: 40px;
        
    }
    .ava-img img{
        width: 100%;
        border-radius: 50%
    }
    .card-header {
        position: relative;
    }
    .add {
        height: 40px
    }
    .card-body{
        padding: 20px
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
    .user_lists {
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