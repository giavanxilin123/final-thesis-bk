import Vue from 'vue';
import Vuex from 'vuex';
import { BASE_URL, actions } from './action';
import { mutations } from './mutation';
Vue.use(Vuex);

const user = JSON.parse(localStorage.getItem('user'));

export default new Vuex.Store({
  state: {
    BASE_URL,
    user: user || {}, 
    allUsers: [],
    orders: []
  },
  mutations,
  actions,

});



