import axios from 'axios';


export const BASE_URL = "http://localhost:5000";

const client = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: false
});

function getDefaultHeader() {
    return {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
    }
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
            .then((res)=>{
                ctx.commit('LOGIN', res.data.user);
                localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
                localStorage.setItem('user', JSON.stringify(res.data.user));
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data)
            })
        })    
    },
    fetchUser(ctx) {
        return new Promise((resolve, reject) => {
            client
              .get(`${BASE_URL}/user-list`)
              .then(res => {
                ctx.commit('FETCH_USER', res.data);
                resolve(res);
              })
              .catch(err => {
                reject(err);
              })
          })
    },
    logOut(ctx) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        ctx.commit('LOG_OUT');
    },
    fetchOrders(ctx) {
        return new Promise((resolve, reject) => {
            client
              .get(`${BASE_URL}/order`)
              .then(res => {
                ctx.commit('FETCH_ORDERS', res.data);
                resolve(res);
              })
              .catch(err => {
                reject(err);
              })
          })
    },
    updateStatus(ctx, payload){
        return new Promise((resolve, reject) => {
            client
              .put(`${BASE_URL}/updateStatus/${payload.id}`, payload)
              .then(res => {
                ctx.commit('UPDATE_STATUS', res.data);
                resolve(res);
              })
              .catch(err => {
                reject(err);
              })
          })
    }
}