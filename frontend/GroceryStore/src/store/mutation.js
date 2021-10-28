export const mutations = {
    FETCH_PRODUCTS(state, payload) {
      state.products = payload;
    },
    CART(state, payload) {
      let empty = state.cart.map(c => c._id).indexOf(payload._id);
      if(empty !== -1){
        state.cart[empty].num ++;
      }else {
        state.cart.push(payload)
      }
    },
    REMOVE_ORDER_LINE(state, payload) {
      state.cart = state.cart.filter(c => c._id !== payload) 
    }
}