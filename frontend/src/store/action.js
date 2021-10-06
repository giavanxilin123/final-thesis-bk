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
    // async register(ctx, payload) {
    //     await axios.post(`${BASE_URL}/api/register`, payload);
    // },

    // logIn(ctx, payload){
    //     return new Promise((resolve, reject) => {
    //         client
    //         .post(`${BASE_URL}/api/login`, payload)
    //         .then((res)=>{
    //             ctx.commit('LOGIN', res.data.user);
    //             localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
    //             localStorage.setItem('user', JSON.stringify(res.data.user));
    //             resolve(res)
    //         })
    //         .catch(err => {
    //             reject(err.response.data)
    //         })
    //     })
    // },

    // signOut(ctx){
    //     localStorage.removeItem('accessToken');
    //     localStorage.removeItem('user');
    //     ctx.commit('SIGN_OUT');
    // },

    // searchRoom(ctx, payload){
    //     ctx.commit('SEARCH_ROOM', payload);
    // }
   
}


