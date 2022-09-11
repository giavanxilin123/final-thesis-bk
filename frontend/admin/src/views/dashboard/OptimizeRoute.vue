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
                <div style="border-radius: 5px; margin-left: 10px; padding: 10px; background: white">
                    <div style="padding: 20px; font-weight: 600" id="total"></div>
                    <div class="sidebar" >
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
        let icon = {
            url: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%20viewBox%3D%220%200%2027%2043%22%3E%3Cdefs%3E%3Cpath%20id%3D%22a%22%20d%3D%22M12.5%200C5.5961%200%200%205.5961%200%2012.5c0%201.8859.54297%203.7461%201.4414%205.4617%203.425%206.6156%2010.216%2013.566%2010.216%2022.195%200%20.46562.37734.84297.84297.84297s.84297-.37734.84297-.84297c0-8.6289%206.7906-15.58%2010.216-22.195.89844-1.7156%201.4414-3.5758%201.4414-5.4617%200-6.9039-5.5961-12.5-12.5-12.5z%22/%3E%3C/defs%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20transform%3D%22translate%281%201%29%22%3E%3Cuse%20fill%3D%22%23EA4335%22%20xlink%3Ahref%3D%22%23a%22/%3E%3Cpath%20d%3D%22M12.5-.5c7.18%200%2013%205.82%2013%2013%200%201.8995-.52398%203.8328-1.4974%205.6916-.91575%201.7688-1.0177%201.9307-4.169%206.7789-4.2579%206.5508-5.9907%2010.447-5.9907%2015.187%200%20.74177-.6012%201.343-1.343%201.343s-1.343-.6012-1.343-1.343c0-4.7396-1.7327-8.6358-5.9907-15.187-3.1512-4.8482-3.2532-5.01-4.1679-6.7768-.97449-1.8608-1.4985-3.7942-1.4985-5.6937%200-7.18%205.82-13%2013-13z%22%20stroke%3D%22%23fff%22/%3E%3C/g%3E%3Ctext%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%20x%3D%2214%22%20y%3D%2215%22%20font-family%3D%22Roboto%2C%20Arial%2C%20sans-serif%22%20font-size%3D%2216px%22%20fill%3D%22%23FFF%22%3EA%3C/text%3E%3C/g%3E%3C/svg%3E", // url
            // scaledSize:  new google.maps.Size(45, 45), // scaled size
        };
        

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
        this.marker = new window.google.maps.Marker({
            position: this.center,
            map: this.map,
            animation:  window.google.maps.Animation.BOUNCE,
            icon: icon
        })
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
        height: 444px;
        overflow: auto;
        border: 1px solid silver;
        margin-top: 2px
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