import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      duration: 0,
      difficulty: 0,
      useSum: false,
      useSubtraction: false,
      useMultiplication: false,
      useDivision: false
    }
  },
  mutations: {
    setState(state,payload) {
      for( let prop in payload) {
        state[prop] = payload[prop];
      }
    }
  },
  actions: {},
});
