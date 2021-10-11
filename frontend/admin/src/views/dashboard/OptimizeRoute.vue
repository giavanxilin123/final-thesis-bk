<template>
    <div class="optimize">
        <el-row>
            <el-col class="vehicle" :span="12">
                <div class="vehicle-num">
                    <div>Number Vehicle</div>
                    <el-select v-model="value" clearable placeholder="Select">
                        <el-option
                        v-for="item in numVehicle"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col class="route" :span="12">Routing Step</el-col>
        </el-row>       
    </div>
</template>

<script>
export default {
    data() {
      return {
        numVehicle: [{
          value: 1,
          label: '1'
        }, {
          value: 2,
          label: '2'
        }, {
          value: 3,
          label: '3'
        }, {
          value: 4,
          label: '4'
        }],
        value: 1
      }
    }
}
</script>

<style scoped="">
    .optimize {
        height: 100vh;
    }
    .vehicle-num {
        background-color: white;
    }
</style>
<style>
    
</style>