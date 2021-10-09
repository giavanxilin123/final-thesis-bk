export const mutations = {
    LOGIN(state, payload) {
      state.user = payload;
    },
    LOG_OUT(state) {
      state.user = {};
    },
    FETCH_USER(state, payload) {
        state.allUsers = payload
    },
    FETCH_ORDERS(state, payload) {
        state.orders = payload
    },
    UPDATE_STATUS(state, payload) {
        state.orders = payload
    }
    // SEARCH_ROOM(state, payload) {
    //   state.searchRoom = payload;
    // }
};
  