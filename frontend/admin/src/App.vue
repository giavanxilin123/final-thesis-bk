<template>
  <div id="app">
    <div id ="map"></div>
    <router-view/>
  </div>
</template>

<script>
import io from 'socket.io-client'
import axios from 'axios'
const socket = io("https://gv-grocery-api.herokuapp.com")

export default {
  data() {
    return {
      queue_order : new Array(52),
      center: {lat: 10.7719937, lng: 106.7057951},
      map: '',
      marker: '',
      interval: null
    }
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

    socket.on('Server-send-data', (data) => {
      clearInterval(this.interval)
      this.$store.dispatch('fetchOrders')
      let {promiseTime} = data
      let p = promiseTime.split(':');
      let p_hour = +p[0];
      let p_minute = +p[1]

      let index = 4 * (p_hour - 9) + p_minute / 15;
      let time_run_engine = ((+p[0]) * 60 + (+p[1])) - data.duration_delivery - 2 
      
      if (this.queue_order[index] == undefined) {
          this.queue_order[index] = {timeRunEngine: time_run_engine, id_list: [data._id]}
      } else if (this.queue_order[index].timeRunEngine >= time_run_engine){
          this.queue_order[index].timeRunEngine = time_run_engine
          this.queue_order[index].id_list.push(data._id)
      }
      else {
        this.queue_order[index].id_list.push(data._id)
      }
      console.log(this.queue_order)
      this.queue_order.map(x => this.interval = setInterval(() => {
        var date = new Date();
        if(date.getHours() === Math.floor (x.timeRunEngine / 60) && date.getMinutes() === (x.timeRunEngine % 60)){
          console.log("change Status!")
          axios.put("http://localhost:5000/api.changeProgressingStatus", {id_list: x.id_list})
          .then(async () => {
            this.$store.dispatch('fetchOrders');
            await this.$store.dispatch('optimizeRoute')
            await this.$store.dispatch('checkVehicleAvailable')
          })
          .then(() => {
            let legs = this.route_legs;
            let location_map = legs.map(x => x.map(y => { return {location : this.orderProgressingList[y-1]['location']}}))
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
                            await axios.put(`https://gv-grocery-api.herokuapp.com/api.vehicleToDelivery/${this.checkVehicleAvailable[step]._id}`, 
                            {time: Math.ceil(time /60)+ d.getHours()*60 + d.getMinutes(),
                            orderId_list: orderId_list[step]})
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
            axios.put("http://localhost:5000/api.changeDeliveringStatus", {id_list: x.id_list})
            this.$store.dispatch('fetchOrders');
            var index;
            this.queue_order.some(function(entry, i) {
                if(entry!= undefined){
                    if (entry.timeRunEngine == x.timeRunEngine) {
                    index = i;
                    return true;
                  }
                }
            });
            this.queue_order[index] = undefined
          })
        }
      }, 60000))

    })

    socket.on('Server-update-time-delivery', (time) => {
      console.log(time)
      clearInterval(this.interval)
      axios.get('https://gv-grocery-api.herokuapp.com/api.vehicle')
           .then(res => {
              let arr_time = res.data.filter(v => v.status == "unavailable").map(t => {return {timeBackToDepot: t.timeBackToDepot, orderId_list: t.orderId_list}})
              arr_time.map(x => this.interval = setInterval(() => {
                var date = new Date();
                if (date.getHours() === Math.floor (x.timeBackToDepot/ 60) && date.getMinutes() === (x.timeBackToDepot % 60)){
                  console.log('reset vehicle!')
                  axios.put('https://gv-grocery-api.herokuapp.com/api.vehicleBackToDepot', {time: x.timeBackToDepot})
                  axios.put('https://gv-grocery-api.herokuapp.com/api.changeCompletedStatus', {id_list: x.orderId_list})
                  .then(() => {
                    this.$store.dispatch('fetchOrders');
                  })     
                }
              }, 60000))
            }
      )
    })
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
  },
  methods: {
    // unique(arr) {
    //   return Array.from(new Set(arr))
    // }
  }
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



