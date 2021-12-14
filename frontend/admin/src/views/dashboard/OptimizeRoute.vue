<template>
    <div class="optimize">
        <div class="back">
            <i
                @click="backToVehiclePage"
                style="margin-left: 5px; cursor: pointer"
                class="el-icon-arrow-left"
                >Back to Vehicle Page</i
            >
            </div>
        <el-row style="position: absolute; top: 100px; width: 100%; width: 95%;right: 50%;transform: translateX(50%);">
            <el-col :span="12">
                <div class="map">
                    <div class="tag-map">
                        <div class="icon-map">
                            <i style="color: white;" class="fas fa-map"></i>
                        </div>
                        <div style="font-size: 18px; padding: 20px">Google Map </div>
                        
                    </div>
                    <div id="map1"></div>
                </div>
            </el-col>
            <el-col  :span="12">
                <div style="margin-left: 10px; padding: 10px; background: black">
                    <div class="sidebar" >
                        <div style="background: black; color: white; font-weight: 600" id="total"></div>
                        <div style=" background: white" class="distance"></div>
                        <div class="panel"></div>
                        <div style="background: white" class="distance"></div>
                        <div class="panel"></div>
                        <div style="background: white" class="distance"></div>
                        <div class="panel"></div>
                        <div style="background: white" class="distance"></div>
                        <div class="panel"></div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
      return {
        value: 1,
        center: {lat: 10.7719937, lng: 106.7057951},
        fullscreenLoading: false,
        map: '',
        marker: '',
        color: ['blue', 'red', 'green', '#6600A1', 'black'],
      }
    },
    
    methods : {
        backToVehiclePage() {
            this.$router.go(-1);
        },
    },

    computed: {
        vehicleById() {
           return this.$store.state.vehicleById 
        }
    },

    async mounted() {
        await this.$store.dispatch('fetchOrders');
        this.map = new window.google.maps.Map(document.getElementById('map1'), {
            center: { lat: this.center.lat, lng: this.center.lng },
            zoom: 16,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        });

        this.marker = new window.google.maps.Marker({
            position: this.center,
            map: this.map,
            animation:  window.google.maps.Animation.BOUNCE
        })

        const {id} = this.$route.query
        await this.$store.dispatch('getVehicleById', id)
        let location_map = this.vehicleById[0].route
        let totalDistance = 0;
                for (const step in location_map){
                    let num = parseInt(step) + 1;
                    document.getElementsByClassName("panel")[step].innerHTML= `Vehicle ${num}`
                    new window.google.maps.DirectionsService().route({
                        origin: this.center,
                        destination: this.center,
                        waypoints: location_map[step],
                        travelMode: 'DRIVING'
                    },
                    async (res, status) => {
                        if (status == 'OK'){
                            new window.google.maps.DirectionsRenderer({
                                panel: document.getElementsByClassName("panel")[step],
                                directions: res,
                                map: this.map,
                                polylineOptions: {
                                    strokeColor: this.color[step],
                                    strokeWeight: '3',
                                    strokeOpacity: '0.5'
                                }
                                }
                            )
                            let distance = res.routes[0].legs.map(x=>x.distance.value).reduce((a,b) => a+b, 0)
                            // let time = res.routes[0].legs.map(x=>x.duration.value).reduce((a,b) => a+b, 0)
                            // let d = new Date()
                            // console.log(Math.ceil(time /60)+ d.getHours()*60 + d.getMinutes())
                            // await axios.put(`http://localhost:5000/api.vehicleToDelivery/${this.checkVehicleAvailable[step]._id}`, {time: Math.ceil(time /60)+ d.getHours()*60 + d.getMinutes()})
                            totalDistance += distance;
                            
                            document.getElementById('total').innerHTML= `Total distance is ${totalDistance} m`
                            document.getElementsByClassName("distance")[step].innerHTML= `Quãng đường Vehicle ${num} đi là: ${distance} m`  
                        }
                    },)
                }
    }
}
</script>

<style scoped="">
    .back {
        background-color: white;
        padding: 15px;
        color: #747c87;
        text-align: left;
    }
    .panel {
        background-color: white;
    }
    .sidebar {
        height: 512px;
        overflow: auto;
    }
    .optimize #map1 {
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
   
</style>

<style>
    
</style>