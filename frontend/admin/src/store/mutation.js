export const mutations = {
    LOGIN(state, payload) {
      state.user = payload;
    },
    FETCH_USER(state, payload) {
        state.allUsers = payload
    }
    // SIGN_OUT(state) {
    //   state.user = {};
    // },
    // SEARCH_ROOM(state, payload) {
    //   state.searchRoom = payload;
    // }
};
  