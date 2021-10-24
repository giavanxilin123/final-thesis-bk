import Vue from 'vue'
import Vuex from 'vuex'
import { BASE_URL, actions } from './action';
import { mutations } from './mutation';
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    BASE_URL,
    products: [],
    cart: []
  },
  mutations,
  actions
})


