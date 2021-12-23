<template>
    <div class="graph">
        <div style="padding: 15px 70px; display: flex; align-items: center; justify-content: space-between">
            <div class="title">Overview Dashboard</div>
            <div class="calendar">
                {{new Date().toDateString()}}
                <i style="margin-left: 30px" class="el-icon-date"></i>
            </div>
        </div>
        
        <el-row class="muiGrid">
            <el-col :span="16">
                <el-row >
                    <el-col :span="8" >
                        <div class="revenue">
                            <div>
                                 <div class="value">${{revenue}}</div>
                                <div class="name">Revenue</div>
                            </div>
                           <i class="icon el-icon-money"></i>
                        </div>  
                    </el-col>
                    <el-col :span="8" >
                        <div class="orders">
                            <div>
                              <div class="value">{{numOrders}}</div>
                             <div class="name">Orders</div>
                         </div>
                          <i class="icon el-icon-document"></i>
                        </div>
                        
                    </el-col>
                    <el-col :span="8" >
                        <div class="customer">
                            <div >
                                <div class="value">{{numCus}}</div>
                                <div class="name">Customer</div>
                             </div>
                             <i class="icon el-icon-s-custom"></i>
                        </div>
                    </el-col>           
                </el-row>
            
                <apexchart style="background: white; border-radius: 20px; margin: 20px 10px 0 10px" ref="chart" width="700" type="area" :options="options" :series="series"></apexchart>
            </el-col>
            <el-col :span="8">
               <div class="best-selling">
                   <div style="font-size: 20px; font-weight: 500">Bestselling Products</div>
                   <div class="products" v-for="(b,i) in bestSelling" :key="i">
                       <div>
                           <div class="name">{{b.name}}</div>
                            <div class="inf">
                                <div style="margin-right: 5px" class="price">${{b.price}}/Each</div>
                                <div class="numOrders">• {{b.num}} Orders</div>
                            </div>
                       </div>
                       <div style="color: cornflowerblue; font-weight: 500" class="total">
                           ${{(b.price * b.num).toFixed(2)}}
                       </div>
                   </div>
               </div>
            </el-col>
            
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }

        function getDates(startDate, stopDate) {
            var dateArray = new Array();
            var currentDate = startDate;
            while (currentDate <= stopDate) {
                dateArray.push(new Date (currentDate));
                currentDate = currentDate.addDays(1);
            }
            return dateArray;
        }
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Octr", "Nov", "Dec"
        ];
        let d =  new Date();
        d.setDate(d.getDate() - 6)
        
        let range = getDates(d, d.addDays(6))
        return {
        range: range,
        options: {
            chart: {
            id: 'vuechart-example'
            },
            xaxis: {
            categories: range.map(x => String(x.getDate()+' ' + String(monthNames[x.getMonth()])))
            },
            yaxis: [
                {
                    title: {
                        text: 'Revenue'
                    }
                }, {
                    opposite: true,
                    title: {
                        text: 'Orders'
                    }
                }
            ]
        },
        series: [
        {
            name: 'Revenue',
            data: []
        },
        {
            name: 'Orders',
            data: []
        },]
        }
        
    },
    
    computed: {
        revenue() {
            return Number(this.$store.state.revenue).toFixed(2)
        },
        numOrders() {
            return this.$store.state.numOrders
        },
        bestSelling() {
            return this.$store.state.bestSelling
        },
        numCus() {
            return this.$store.state.numCus
        },
    },

    async created() {
            await axios.get('http://localhost:5000/api.orderLastWeek')
            .then(res => {
                let arr =res.data.map(x=> {
                    return {total: x.total, date:new Date(x.date).toDateString(), numOrder: 1}
                })
                const alo = arr.reduce((acc, curr) => {
                const group = acc.find(g => g.date === curr.date)
                if (group) {
                    group.total = group.total + curr.total;
                    group.numOrder +=1
                } else {
                    acc.push({date: curr.date, total: curr.total, numOrder: 1})
                }
                return acc
                }, [])
                let total = this.range.map(x => x.toDateString())
                    .map(x => {
                        let index = alo.map(x => x.date).indexOf(x)
                        if(index > -1){
                            return Number(alo[index].total).toFixed(2)
                        }
                        return 0
                })
                let numOrder = this.range.map(x => x.toDateString())
                    .map(x => {
                        let index = alo.map(x => x.date).indexOf(x)
                        if(index > -1){
                            return alo[index].numOrder
                        }
                        return 0
                })
                this.$refs.chart.updateSeries(
                    [{
                    name: 'Revenue',
                    data: total
                },
                {
                    name: 'Orders',
                    data: numOrder
                },]
                )
            })

            this.$store.dispatch('getRevenue')
            this.$store.dispatch('getNumOrders')
            this.$store.dispatch('getNumCus')
            this.$store.dispatch('getBestSelling')
    },
}
</script>

<style scoped="">
    .graph {
        background-color: transparent;
        height: 100vh;
        overflow: auto;
    }
    .graph .title {
        font-size: 25px;
        text-align: left;
    }
    .graph .muiGrid {
        margin: 10px auto;
        width: 90%;
    }
    .graph .value {
        font-weight:  600;
        font-size: 24px;
        color: black;
    }
    .graph .revenue {
        background-color: #e0f7d4;
        color: #67c23a;
        border-radius: 15px;
        display: flex;
        align-items: center;
        padding: 20px;
        justify-content: space-between;
        margin: 0 10px;
    }
    .graph .orders {
        background-color: #f8e6cc;
        color: #e6a23c;
        border-radius: 15px;
        margin: 0 10px;
        display: flex;
        align-items: center;
        padding: 20px;
        justify-content: space-between;
    }
    .graph .customer {
        background-color: #f8cfcf;
        color: #f56c6c;
        border-radius: 15px;
        display: flex;
        align-items: center;
        padding: 20px;
        justify-content: space-between;
        margin: 0 10px;
    }
    .graph .icon {
        font-size: 30px
    }
    .graph .name {
        font-weight: 600;
    }
    .graph .best-selling {
        background: white;
        border-radius: 15px;
        padding: 20px 15px;
        text-align: left;
        height: 524px;
        overflow: auto;
    }
    .graph .name {
        font-weight: 600;
    }
    .graph .products {
        padding: 15px 0;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .graph .inf {
        display: flex;
        font-size: 14px;
        color: gray;
    }
    .graph .calendar {
        background: white;
        border-radius: 10px;
        padding: 15px 20px;
        font-weight: 500;
        font-size: 14px
    }
</style>



