export const mutations = {
  LOGIN(state, payload) {
    state.user = payload;
  },
  LOG_OUT(state) {
    state.user = {};
  },
  FETCH_USER(state, payload) {
    state.allUsers = payload;
  },
  FETCH_ORDERS(state, payload) {
    state.orders = payload;
  },
  FETCH_PRODUCTS(state, payload) {
    state.products = payload;
  },
  GET_PRODUCT_BY_ID(state, payload) {
    state.productById = payload;
  },
  ROUTE_LEGS(state, payload) {
    state.route_legs = payload
  },
  CHECK_VEHICLE_AVAILABLE(state, payload){
    state.checkVehicleAvailable = payload
  },
  CONFIG(state, payload){
    state.config = payload
  },
  ORDER_AUTO_COLLECTION(state, payload) {
    state.collection = payload
  },
  VEHICLE(state, payload) {
    state.vehicle = payload
  },
  ORDER_BY_ID(state, payload) {
    state.orderById = payload
  },
  GET_VEHICLE_BY_ID(state, payload) {
    state.vehicleById = payload
  },
  GET_ORDER_COLLECTION(state, payload) {
    state.orderCollection = payload
  },
  GET_REVENUE(state, payload) {
    state.revenue = payload
  },
  GET_NUM_ORDERS(state, payload) {
    state.numOrders = payload
  },
  GET_NUM_CUS(state, payload) {
    state.numCus = payload
  },
  GET_BESTSELLING(state, payload) {
    state.bestSelling = payload
  },
};
