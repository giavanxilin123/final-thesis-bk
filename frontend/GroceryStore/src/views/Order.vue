<template>
  <div class="order">
    <el-row :gutter="20">
      <el-col
        style="
          text-align: left;
          position: relative;
        "
        :lg="15"
        :xs="24"
      >
        <div class="order-col">
          <div style="font-size: 25px; margin: 15px 0; font-weight: 700">
          1. Personal Information
        </div>
        <el-form
          style="margin-bottom: 40px"
          ref="formOrder"
          :model="formOrder"
          label-width="120px"
        >
          <el-form-item label="Full Name">
            <el-input
              placeholder="Please input"
              v-model="formOrder.fullname"
              :disabled="true"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="Username">
            <el-input
              placeholder="Please input"
              v-model="formOrder.username"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input
              placeholder="Please input"
              v-model="formOrder.email"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="Phone">
            <el-input
              placeholder="Please input"
              v-model="formOrder.phone"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-form>

        <div
          style="
            font-size: 25px;
            margin: 15px 0;
            border-top: 2px solid #e5e5e5;
            padding-top: 25px;
            font-weight: 700;
          "
        >
          2. Addresses
        </div>
        <el-form
          style="margin-bottom: 50px"
          ref="formOrder"
          :rules="rules"
          :model="formOrder"
          label-width="120px"
        >
          <el-form-item label="Enter Address" prop="address">
            <el-input id="auto_search" v-model="formOrder.address"></el-input>
          </el-form-item>
        </el-form>

        <div id="map"></div>
        <div
          style="
            font-size: 25px;
            margin: 15px 0;
            border-top: 2px solid #e5e5e5;
            padding-top: 25px;
            font-weight: 700;
          "
        >
          3. Select time
        </div>
        <el-time-select
          v-model="time"
          :picker-options="{
            start: date,
            step: '2:00',
            end: '22:00'
          }"
          placeholder="Select time">
        </el-time-select>
        <el-button
          @click="checkOut('formOrder')"
          type="success"
          style="margin: 20px 0"
          >Check Out</el-button
        >
        </div>
      </el-col>

      <el-col :lg="9" :xs="24">
        <div class="order-col">
          <div class="total">
            <div class="type-fee">
              <div style="text-align: left">
                <div class="fee-detail">Subtotal</div>
                <div class="fee-detail">Shipping</div>
                <div class="fee-detail">Taxes</div>
              </div>
              <div style="text-align: right">
                <div class="fee-detail">${{ subTotal }}</div>
                <div class="fee-detail">Free</div>
                <div class="fee-detail">
                  ${{ ((subTotal * 5) / 100).toFixed(2) }}
                </div>
              </div>
            </div>
            <div class="sum">
              <div>TOTAL</div>
              <div>${{ ((subTotal * 105) / 100).toFixed(2) }}</div>
            </div>

            <div class="icon-bg">
              <div class="icon-detail">
                <div class="icon">
                  <img src="../assets/delivery.jpeg" alt="" />
                </div>
                <div class="icon-content">Free delivery</div>
              </div>
              <div
                style="
                  border-top: 2px solid #e5e5e5;
                  border-bottom: 2px solid #e5e5e5;
                "
                class="icon-detail"
              >
                <div class="icon">
                  <img src="../assets/money.jpeg" alt="" />
                </div>
                <div class="icon-content">Money Back</div>
              </div>
              <div class="icon-detail">
                <div class="icon">
                  <img src="../assets/support.jpeg" alt="" />
                </div>
                <div class="icon-content">Support 24/7</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    var checkAddress = (rule, value, callback)=>{
      if (!value) {
        this.alertErr({message: "Please input the address"})
        return callback(new Error('Please input the address'));
      }
      setTimeout(() => {
          if (!this.formOrder.location.lat) {
            this.alertErr({message: "Please select the address by google map"})
            callback(new Error('Please select address by google map'));
          } else if(this.formOrder.total == 0) {
            this.alertErr({message: "Order is empty, please check again!"})
          } else {
            callback()
          }
      }, 1000);
    };
    return {
      formOrder: {
        fullname: "",
        username: "",
        email: "",
        phone: "",
        address: "",
        order: [],
        total: 0,
        location: {
          lat: "",
          lng: "",
        },
        status: "New",
        date: "",
      },
      time: '',
      rules: {
        address: [{validator: checkAddress, trigger: "blur"}]
      },
      center: { lat: 10.7719937, lng: 106.7057951 },
    };
  },

  computed: {
    cart() {
      return this.$store.state.cart;
    },
    subTotal() {
      return this.$store.state.cart
        .map((c) => c.price * c.num)
        .reduce((a, b) => a + b, 0)
        .toFixed(2);
    },
    customer() {
      return this.$store.state.customer;
    },
    date(){
      let d = new Date();
      return String(d.getHours() + 1)+':00'
    }

  },

  mounted() {
    this.formOrder.order = this.$store.state.cart;
    // this.formOrder.order.map(o => delete o.img)
    this.formOrder.total = Math.round(this.subTotal * 105) / 100;
    this.formOrder.username = this.customer.username;
    this.formOrder.fullname = this.customer.fullname;
    this.formOrder.email = this.customer.email;
    this.formOrder.phone = this.customer.phone;

    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: this.center.lat, lng: this.center.lng },
      zoom: 16,
    });

    let marker = new window.google.maps.Marker({
      position: this.center,
      map: map,
      animation: window.google.maps.Animation.BOUNCE,
    });

    let directionsService = new window.google.maps.DirectionsService();

    let autoComplete = new window.google.maps.places.Autocomplete(
      document.getElementById("auto_search")
    );

    autoComplete.addListener("place_changed", () => {
      let place = autoComplete.getPlace();
      let {formatted_address} = place
      let {name} = place
      
      this.formOrder.address = (formatted_address.substring(0, name.length) == name) ? formatted_address : name + ", " + formatted_address;

      this.formOrder.location.lat = place.geometry.location.lat();
      this.formOrder.location.lng = place.geometry.location.lng();

      directionsService.route(
        {
          origin: this.center,
          destination: place.geometry.location,
          travelMode: "DRIVING",
        },
        (res, status) => {
          if (status == "OK") {
            new window.google.maps.DirectionsRenderer({
              directions: res,
              map: map,
            });
          }
          console.log(res)
        },
        map.setCenter(place.geometry.location),
        marker.setPosition(place.geometry.location)
      );
      
    });
  },

  methods: {
    async checkOut(formName) {
      this.$refs[formName].validate(async (valid ) => {
        if (valid) {
          let d = new Date();
          this.formOrder.date = d.toLocaleString();
          await this.$store.dispatch('checkOut', {formOrder: this.formOrder})
          .then(() => {
              this.alertSuccess();
              this.$router.push("/");
            })
          .catch((err) => this.alertErr(err.response.data));
        } else {
          return false;
        }
      })  
    },
    alertErr(err) {
      this.$message({
        showClose: true,
        message: err.message || "Đã có lỗi xảy ra!",
        type: "error",
      });
    },
    alertSuccess() {
      this.$message({
        showClose: true,
        message: "Đặt hàng thành Công!",
        type: "success",
      });
    },
  },
};
</script>

<style>

.order {
  max-width: 1250px;
  margin: 0 auto;
  width: 90%;
}

.order #map {
  height: 500px;
}
</style>

<style scoped>
@media (max-width: 480px) {
.order-col {
  padding: 0 !important;
  border-right: none !important;
}
}
.order-col {
  padding: 55px;
  border-right: 1px solid #e5e5e5;
}
.sum {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  padding: 20px 0;
  border-top: 2px solid #e5e5e5;
  font-weight: 500;
}
.type-fee {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 15px;
  font-weight: 500;
}
.fee-detail {
  font-size: 16px;
  font-weight: 500;
  padding: 5px;
}
.icon-bg {
  background-color: #f1f1f1;
  padding: 0 30px;
  text-align: left;
}
.icon-detail {
  padding: 25px 0;
  display: flex;
  align-items: center;
}
.icon {
  margin-right: 10px;
}
</style>