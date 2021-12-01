import axios from "axios";


export const BASE_URL = "http://localhost:5000";
// export const BASE_URL = "https://gv-grocery-api.herokuapp.com";



const client = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  withCredentials: false,
});

function getDefaultHeader() {
  return {
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("accessToken")),
  };
}

client.interceptors.request.use((config) => {
  Object.assign(config.headers, getDefaultHeader());
  return config;
});

export const actions = {
  logIn(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .post(`${BASE_URL}/login`, payload)
        .then((res) => {
          ctx.commit("LOGIN", res.data.user);
          localStorage.setItem(
            "accessToken",
            JSON.stringify(res.data.accessToken)
          );
          localStorage.setItem("user", JSON.stringify(res.data.user));
          resolve(res);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },
  fetchUser(ctx) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/user-list`)
        .then((res) => {
          ctx.commit("FETCH_USER", res.data);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  logOut(ctx) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    ctx.commit("LOG_OUT");
  },
  fetchOrders(ctx) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/order`)
        .then((res) => {
          ctx.commit("FETCH_ORDERS", res.data);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateStatus(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .put(`${BASE_URL}/updateStatus/${payload.id}`, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  fetchProducts(ctx) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/products`)
        .then((res) => {
          ctx.commit("FETCH_PRODUCTS", res.data);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteProductById(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .delete(`${BASE_URL}/deleteProductById/${payload}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getProductById(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.getProductById/${payload}`)
        .then((res) => {
          ctx.commit("GET_PRODUCT_BY_ID", res.data)
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  optimizeRoute(ctx) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/solving-route`)
        .then((res) => {
          ctx.commit("ROUTE_LEGS", res.data.route_legs)
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  checkVehicleAvailable(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.checkVehicleAvailable`, payload)
        .then((res) => {
          ctx.commit('CHECK_VEHICLE_AVAILABLE', res.data)
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  config(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.config`, payload)
        .then((res) => {
          ctx.commit('CONFIG', res.data)
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  orderAutoCollection(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.orderAutoCollection`, payload)
        .then((res) => {
          ctx.commit('ORDER_AUTO_COLLECTION', res.data)
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  vehicle(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.vehicle`, payload)
        .then((res) => {
          ctx.commit('VEHICLE', res.data)
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getOrderById(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.orderById/${payload}`)
        .then((res) => {
          ctx.commit('ORDER_BY_ID', res.data)
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
