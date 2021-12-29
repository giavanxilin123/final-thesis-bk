<template>
  <div id="app">
    <div id ="map"></div>
    <router-view/>
  </div>
</template>

<script>
import io from 'socket.io-client'
import axios from 'axios'


const BASE_URL = "http://localhost:5000"
// const BASE_URL = "https://gv-grocery-api.herokuapp.com"
// const socket = io("https://gv-grocery-api.herokuapp.com")
const socket = io("http://localhost:5000")

export default {
  data() {
    return {
      center: {lat: 10.7719937, lng: 106.7057951},
      map: '',
      marker: '',
      interval: {},

      intervalTimeBack: null,
    }
  },

  methods: {
    
  },

  async mounted() {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: this.center.lat, lng: this.center.lng },
      zoom: 16,
    });

    this.marker = new window.google.maps.Marker({
      position: this.center,
      map: this.map,
      animation: window.google.maps.Animation.BOUNCE
    })

    socket.on('Server-send-data', async (data) => {
      
      this.$store.dispatch('fetchOrders')
      console.log(data)

      await this.$store.dispatch('orderAutoCollection')
      console.log(this.collection)
      
      this.collection.map(x => {
        clearInterval(this.interval[x.index])
        this.interval[x.index] = setInterval(() => {
        var date = new Date();
        if(date.getHours() === Math.floor (x.timeRunEngine / 60) && date.getMinutes() === (x.timeRunEngine % 60)){
          console.log("change Status!", date)
          axios.put(`${BASE_URL}/api.changeProgressingStatus`, {id_list: x.id_list})
          .then(async () => {
            this.$store.dispatch('fetchOrders');
            await this.$store.dispatch('optimizeRoute')
            await this.$store.dispatch('checkVehicleAvailable')
          })
          .then(() => {
            let legs = this.route_legs;
            let location_map = legs.map(x => x.map(y => { return {location : this.orderProgressingList[y-1]['location']}}))
            console.log(location_map)
            let orderId_list = legs.map(x => x.map(y => this.orderProgressingList[y-1]['_id']))
            // let totalDistance = 0;
            for (const step in location_map){
                    // let num = parseInt(step) + 1;
                    // document.getElementsByClassName("panel")[step].innerHTML= `Vehicle ${num}`
                    new window.google.maps.DirectionsService().route({
                        origin: this.center,
                        destination: this.center,
                        waypoints: location_map[step],
                        travelMode: 'DRIVING'
                    },
                    async (res, status) => {
                        if (status == 'OK'){
                            // let distance = res.routes[0].legs.map(x=>x.distance.value).reduce((a,b) => a+b, 0)
                            // totalDistance += distance;
                            let time = res.routes[0].legs.map(x=>x.duration.value).reduce((a,b) => a+b, 0)
                            let d = new Date()
                            await axios.put(`${BASE_URL}/api.vehicleToDelivery/${this.checkVehicleAvailable[step]._id}`, 
                            {time: Math.ceil(time / 60)+ d.getHours()* 60 + d.getMinutes(),
                            orderId_list: orderId_list[step],
                            route: location_map})
                            let text;
                            for (const i in res.routes[0].legs) {
                                text += `- POINT ${String.fromCharCode(65 + parseInt(i))}: ${res.routes[0].legs[i].start_address} %0A`
                                for (const j in res.routes[0].legs[i].steps){
                                    text += `${parseInt(j) + 1}. ${res.routes[0].legs[i].steps[j].instructions} %0A`
                                }
                            }
                            text += `- POINT A: ${res.routes[0].legs[res.routes[0].legs.length - 1].end_address} %0A`
                            text = text.split('<b>').join('')
                                   .split('</b>').join('')
                                   .split('<div style="font-size:0.9em">').join('')
                                   .split('<div>').join('')
                                   .split('&nbsp;').join('')
                                   .split('</div>').join('')
                                   .split('<wbr/>').join(' ')
                                   .split('&amp').join('')
                                   .split('undefined').join('')
                            await axios.post(`https://api.telegram.org/bot2132188523:AAHyWbw4hkfmThyBEJdfu5tBbaZ25kamQQY/sendMessage?chat_id=-683648998&text=${text}`)
                            // document.getElementById('total').innerHTML= `Total distance is ${totalDistance} m`
                            // document.getElementsByClassName("distance")[step].innerHTML= `Quãng đường Vehicle ${num} đi là: ${distance} m`  
                        }
                    },)
              }
          })
          .then(async()=> {
            axios.put(`${BASE_URL}/api.changeDeliveringStatus`, {id_list: x.id_list})
            .then(() => {
              this.$store.dispatch('fetchOrders');
            })
          })
        }
      }, 60000)
      }
      )
    })

    socket.on('Server-update-time-delivery', (time) => {
      console.log(time)
      clearInterval(this.intervalTimeBack)
      axios.get(`${BASE_URL}/api.vehicle`)
           .then(res => {
              let arr_time = res.data.filter(v => v.status == "unavailable").map(t => {return {timeBackToDepot: t.timeBackToDepot, orderId_list: t.orderId_list}})
              arr_time.map(x => this.intervalTimeBack = setInterval(() => {
                var date = new Date();
                if (date.getHours() === Math.floor (x.timeBackToDepot/ 60) && date.getMinutes() === (x.timeBackToDepot % 60)){
                  console.log('reset vehicle!')
                  axios.put(`${BASE_URL}/api.vehicleBackToDepot`, {time: x.timeBackToDepot})
                  axios.put(`${BASE_URL}/api.changeCompletedStatus`, {id_list: x.orderId_list})
                  .then(() => {
                    this.$store.dispatch('fetchOrders');
                  })     
                }
              }, 60000))
            }
      )
    })
  },

  beforeDestroy() {
    for (const [,value] of Object.entries(this.interval)) {
      clearInterval(value)
    }
  },

  computed: {
    orderProgressingList() {
      return this.$store.state.orders.filter(x => x.status == 'Progressing');
    },
    route_legs() {
      return this.$store.state.route_legs
    },
    checkVehicleAvailable() {
      return this.$store.state.checkVehicleAvailable
    },
    collection() {
      return this.$store.state.collection
    },
  },
 
}
</script>
<style>
body {
  margin: 0;
}

#map {
  height: 400px; width: 400px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#map {
  display: none;
}
</style>



