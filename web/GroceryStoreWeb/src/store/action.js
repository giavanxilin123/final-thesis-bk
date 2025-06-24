import axios from "axios";

export const BASE_URL = "http://localhost:5000";

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
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

  getOrderHistory(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/getOrderByUsername/${payload}`)
        .then((res) => {
          ctx.commit("GET_ORDER_HISTORY", res.data);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  cart(ctx, payload) {
    ctx.commit("CART", payload.cart);
  },

  removeOrderLine(ctx, payload) {
    ctx.commit("REMOVE_ORDER_LINE", payload);
  },
  logIn(ctx,payload) {
    return new Promise((resolve, reject) => {
      client
        .post(`${BASE_URL}/cusLogin`, payload)
        .then((res) => {
          ctx.commit("CUS_LOGIN", res.data.customer);
          localStorage.setItem(
            "cus_accessToken",
            JSON.stringify(res.data.accessToken)
          );
          localStorage.setItem("customer", JSON.stringify(res.data.customer));
          resolve(res);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },
  logOut(ctx) {
    localStorage.removeItem("cus_accessToken");
    localStorage.removeItem("customer");
    ctx.commit("LOG_OUT");
  },
};
