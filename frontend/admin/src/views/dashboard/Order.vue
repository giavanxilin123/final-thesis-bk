<template>
    <div class = "order-management">
        <div class="user_lists">
            <div class="card-header">
                <div class="icon"><i class="el-icon-document"></i></div>
                <div class="title">Orders List</div>
            </div>
            <div class="card-body">
                <div class="toolbar">
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
                </div>
                <div class="table-content">
                    <div class="table-head">
                        <el-row :gutter="20">
                            <el-col :span="1"><div>STT</div></el-col>
                            <el-col :span="3"><div>Code</div></el-col>
                            <el-col :span="4"><div>Name</div></el-col>
                            <el-col :span="2"><div>Order Detail</div></el-col>
                            <el-col :span="5"><div>Address</div></el-col>
                            <el-col :span="3"><div>Created At <i class="el-icon-top"></i></div></el-col>
                            <el-col :span="3"><div>Status</div></el-col>
                            <el-col :span="3"><div style="text-align: right">Actions</div></el-col>
                        </el-row>
                    </div>
                    <div class="table-body">
                        <el-row v-for="(order,index) in orderList" :key="index" style = "background-color: #f9f9f9" :gutter="20">
                            <el-col :span="1">
                                <div class= "avatar">
                                    <div class="ava-img">
                                        {{index+1}}
                                    </div>  
                                </div>
                                </el-col>
                            <el-col :span="3">
                                <div style="overflow: scroll; white-space: nowrap; width: 54px" class= "id">
                                    {{order._id}}
                                </div>
                            </el-col>
                            <el-col :span="4">
                                <div class= "name">
                                    {{order.fullname}}
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div class= "product">
                                    {{order.product_name}}
                                </div>
                            </el-col>
                             <el-col :span="5">
                                <div class= "address">
                                    {{order.address}}
                                </div>
                            </el-col>
                            <el-col :span="3"><div>{{order.date}}</div></el-col>
                             <el-col :span="3">
                                <div style="width: 85px; text-align:center; color: white; font-weight: 600" :style="{
                                    padding:'5px', 
                                    backgroundColor: order.status == 'New' ? '#409eff' : (order.status == 'Completed'? '#67c23a' 
                                    :(order.status == 'Delivering'? '#9c27b0' :'#e6a23c'))}" 
                                    class= "status">
                                    {{order.status}}
                                </div>
                               
                            </el-col>
                            <el-col :span="3">
                                <div class="action">
                                    <div :style="{backgroundColor: order.status == 'New' ?'#e6a23c' :'#409eff'}" 
                                    v-if="order.status == 'New' || order.status =='Progressing'" 
                                    @click="changeStatus(order._id, order.status)"
                                    class="action-changeStatus">
                                        <i v-if="order.status == 'New'" class="el-icon-upload2"></i>
                                        <i v-if="order.status == 'Progressing'" class="el-icon-download"></i>
                                    </div>
                                    <div class="action-edit">
                                        <i class="el-icon-edit"></i>
                                    </div>
                                </div>
                            </el-col>
                        </el-row> 
                    </div>
                    <div class="table-footer">
                        <el-pagination
                            :page-size="3"
                            layout="prev, pager, next"
                            :total="7"
                            @current-change=1>
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
      </div>
</template>


<script>

export default {
    data(){
        return {
            options: [{
            value: '5',
            label: '5'
            }, {
            value: '10',
            label: '10'
            }, {
            value: '25',
            label: '25'
            }, {
            value: '50',
            label: '50'
            }],
            value: '',
            input: '',
         }
    },

    methods: {
        async changeStatus(id, status){
            this.$store.dispatch('updateStatus', {id: id, status: status})
            await this.$store.dispatch('fetchOrders')
        }  
    },

    async created() {
        await this.$store.dispatch('fetchOrders');
    },
   
    computed: {
        orderList() {
            return this.$store.state.orders;
        },
    },

    

}
</script>

<style>
    .order-management .table-footer {
        padding-top: 20px;
    }
    .order-management .el-pagination {
        text-align: right;
    }
    .order-management .table-body .el-row {
        border-bottom: 1px solid silver;
        padding: 5px 0;
        display: flex;
    }
    .order-management .action-edit {
        position: relative;
        margin-right: 5px;
        cursor: pointer;
    }
    .order-management .table-body .el-icon-edit {
        position: absolute;
        right: 50%;
        top: 50%;
        transform: translate(50%, -50%);
    }
    .order-management .icon {
        height: 60px;
        width: 60px;
        background-color: #9c27b0; 
        border-radius: 3px;
        position: absolute;
        left: 15px;
        top: -15px;
    }
    .order-management .card-header .icon .el-icon-document {
        color: white;
        position: absolute;
        right: 50%;
        top: 50%;
        transform: translate(50%, -50%);
        font-size: 25px;
    }
    .order-management .action-changeStatus {
        position: relative;
    }
    .order-management .table-body .el-icon-upload2 {
        position: absolute;
        right: 50%;
        top: 50%;
        transform: translate(50%, -50%);
    }
    .order-management .table-body .el-icon-download {
        position: absolute;
        right: 50%;
        top: 50%;
        transform: translate(50%, -50%);
    }
    .order-management .table-body .el-col {
        display: flex;
        align-items: center;
    }
    .order-management .card-body .el-button {
         background-color: #9c27b0;
         color: white;
         border: none;
         font-size: 12px;
         padding: 10px 30px;
    }
    .order-management .card-body .el-input {
        width: 200px
    }
    .order-management .toolbar input {
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
        background-color: #f44336;
        color:white;
        border-radius: 50%;
        width: 30px;
        height: 30px;
    }
    .action-changeStatus {
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
    .order-management {
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