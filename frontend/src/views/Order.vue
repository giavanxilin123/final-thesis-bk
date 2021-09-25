
<template>
  <div style="display: flex">
    <div class="information">
        <div>Personal Information</div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="First Name">
                <el-input v-model="form.fname"></el-input>
            </el-form-item>
            <el-form-item label="Last name">
                <el-input v-model="form.lname"></el-input>
            </el-form-item>
            <el-form-item label="Email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
        </el-form>
        <div>Addresses</div>
    </div>
    <div id ="map">
        
    </div>
  </div>
</template>

<script>
export default {
     data() {
      return {
        form: {
            fname:'',
            lname:'',
            email:'',
            map:''
        }
      };
    },
    methods: {
        // initMap() {
        // map = new google.maps.Map(document.getElementById("map"), {
        //     center: { lat: -34.397, lng: 150.644 },
        //     zoom: 8,
        // });
        // }
    }

        
}
</script>