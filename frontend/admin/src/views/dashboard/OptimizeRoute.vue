<template>
    <div class="optimize">
        <el-row style="position: absolute; top: 60px; width: 100%; width: 95%;right: 50%;transform: translateX(50%);">
            <el-col :span="12">
                <div class="vehicle">
                        <div class="tag-vehicle">
                    <div class="icon-truck">
                        <i style="color: white; " class="fas fa-truck"></i>
                    </div>
                    <div style="font-size: 18px; padding: 20px">Vehicle</div>
                </div>
                <el-row class="vehicle-type">
                    <el-col style="border-right: 1px solid #eee" :span="4">Types</el-col>
                    <el-col :span="10">
                        <div style="height: 300px">
                        <img src="../../assets/vehicle5.jpeg" alt="">
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div style="height: 300px">
                        <img src="../../assets/vehicle2.jpeg" alt="">
                    </div>
                    </el-col>        
                </el-row>
                
                <el-row class="vehicle-capacity">
                    <el-col style="border-right: 1px solid #eee" :span="4">Capacity</el-col>
                    <el-col :span="10">
                        <div style="padding: 10px; background-color: #67c23a; color: white; width: 30%; margin: 0 auto; border-radius: 5px">
                        10
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div style="padding: 10px; background-color: #67c23a; color: white; width: 30%; margin: 0 auto; border-radius: 5px">
                        15
                    </div>
                    </el-col>        
                </el-row>

                <el-row class="vehicle-quantity">
                    <el-col style="border-right: 1px solid #eee" :span="4">Quantity</el-col>
                    <el-col :span="10">
                         <el-select v-model="value" clearable placeholder="Select">
                        <el-option
                        v-for="item in numVehicle"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    </el-col>
                    <el-col :span="10">
                         <el-select v-model="value" clearable placeholder="Select">
                        <el-option
                        v-for="item in numVehicle"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    </el-col>
                </el-row>
                </div>
            </el-col>
            <el-col  :span="12">
                <div class="map">
                    <div class="tag-map">
                        <div class="icon-map">
                            <i style="color: white;" class="fas fa-map"></i>
                        </div>
                        <div style="font-size: 18px; padding: 20px">Google Map</div>
                    </div>
                    <div id="map"></div>
                </div>
                
            </el-col>
            <div class="route-step">
                <el-button v-loading.fullscreen.lock="fullscreenLoading" @click="optimizeRoute" type="success">Optimize Route</el-button>
                <!-- <el-button
                    type="primary"
                    @click="openFullScreen1"
                    v-loading.fullscreen.lock="fullscreenLoading">
                    As a directive
                </el-button> -->
            </div>
        </el-row>       
    </div>
</template>

<script>
import axios from 'axios'
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
        }],
        value: 1,
        center: {lat: 10.7719937, lng: 106.7057951},
        fullscreenLoading: false,
        map: '',
        marker: '',
        color: ['blue', 'green', 'red', 'yellow']
      }
    },
    
    methods : {
        async optimizeRoute() {
            const loading = this.$loading({
                lock: true,
                text: 'Optimizing Route',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            await axios.get("http://localhost:5000/solving-route")
            .then(res => {
                let legs = res.data.route_legs;
                let location_map = legs.map(x => x.map(y => { return {location : this.orderProgressingList[y-1]['location']}}))
                for (const step in location_map){

                    new window.google.maps.DirectionsService().route({
                        origin: this.center,
                        destination: this.center,
                        waypoints: location_map[step],
                        travelMode: 'DRIVING'
                    },
                    (res, status) => {
                        if (status == 'OK'){
                            new window.google.maps.DirectionsRenderer({
                                directions: res,
                                map: this.map,
                                polylineOptions: {
                                    strokeColor: this.color[step],
                                    strokeWeight: '3',
                                    strokeOpacity: '0.5'
                                }
                                }
                            )
                        }
                    },)
                }
                loading.close()
            })
        },
    },

    computed: {
        orderProgressingList() {
            return this.$store.state.orders.filter(x => x.status == 'Progressing');
        },
    },



    async mounted() {
        await this.$store.dispatch('fetchOrders');
        console.log(this.orderProgressingList)
        
        this.map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: this.center.lat, lng: this.center.lng },
            zoom: 16,
        });

        this.marker = new window.google.maps.Marker({
            position: this.center,
            map: this.map,
            animation:  window.google.maps.Animation.BOUNCE
        })

        // new window.google.maps.DirectionsService().route({
        //         origin: this.center,
        //         destination: this.center,
        //         waypoints: [
        //             {location: {lat: 10.7950125, lng: 106.7218535}},
        //             {location: {lat: 10.7894745, lng: 106.744078}}
        //         ],
        //         travelMode: 'DRIVING'
        //     },
        //     (res, status) => {
        //         if (status == 'OK'){
        //             new window.google.maps.DirectionsRenderer({
        //                 directions: res,
        //                 map: this.map,
        //                 polylineOptions: {
        //                     strokeColor: 'blue',
        //                     strokeWeight: '3',
        //                     strokeOpacity: '0.5'
        //                 }
        //             })
        //         }
        //     },
        // )
    }
    
}
</script>

<style scoped="">
    .optimize #map {
        height: 444px;
        margin: 10px;
    }
    .optimize {
        height: 100vh;
        position: relative;
    }
    .optimize .icon-truck {
        position: absolute;
        top: -15px;
        left: 15px;
        width: 60px;
        background-color: #4caf50;
        height: 60px;
        line-height: 60px;
        border-radius: 5px;
    }
    .optimize .icon-map {
        position: absolute;
        top: -15px;
        left: 15px;
        width: 60px;
        background-color: #4caf50;
        height: 60px;
        line-height: 60px;
        border-radius: 5px;
    }
    .vehicle img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        
    }
    .vehicle {
        background-color: white;
        font-weight: 500;
        border-radius: 5px;
        margin-right: 10px;
        border: 1px solid #eee;
    }
    .vehicle-type {
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
    }
    .vehicle-quantity {
        border-bottom: 1px solid #eee;
        padding: 20px;
        display: flex;
        align-items: center;
    }
    .vehicle-capacity {
        padding: 20px;
        display: flex;
        align-items: center;
    }
    .tag-vehicle {
        position: relative !important;
    }
    .tag-map {
        position: relative !important;
    }
    .map {
        background-color: white;
        font-weight: 500;
        border-radius: 5px;
        margin-left: 10px;
        border: 1px solid #eee;
    }
    /* .route-step {
        background: white;
    } */
</style>
<style>
    
</style>