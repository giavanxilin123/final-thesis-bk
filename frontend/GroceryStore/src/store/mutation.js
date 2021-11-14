export const mutations = {
  FETCH_PRODUCTS(state, payload) {
    state.products = payload;
  },
  CART(state, payload) {
    let empty = state.cart.map((c) => c._id).indexOf(payload._id);
    if (empty !== -1) {
      state.cart[empty].num++;
    } else {
      state.cart.push(payload);
    }
  },
  REMOVE_ORDER_LINE(state, payload) {
    state.cart = state.cart.filter((c) => c._id !== payload);
  },
  GET_ORDER_HISTORY(state, payload) {
    state.orderHistory = payload;
  },
  CUS_LOGIN(state, payload) {
    state.customer = payload
  },
  LOG_OUT(state) {
    state.customer = {};
  },
  CHECK_VEHICLE_AVAILABLE(state, payload){
    state.checkVehicleAvailable = payload
  }
};


