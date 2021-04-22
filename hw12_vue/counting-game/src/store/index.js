import { createStore } from 'vuex'

export default createStore({
  state: {
    levels: {
      "1": {
        digitsAmountMax: 1,
        elementsAmount: 2,
        unknownAmount: 1,
        unknowPosition: "resultOnly"
      },
      "2": {
        digitsAmountMax: 1,
        elementsAmount: 2,
        unknownAmount: 1,
        unknowPosition: "any"
      },
      "3": {
        digitsAmountMax: 1,
        elementsAmount: 3,
        unknownAmount: 1,
        unknowPosition: "resultOnly"
      },
      "4": {
        digitsAmountMax: 1,
        elementsAmount: 3,
        unknownAmount: 1,
        unknowPosition: "any"
      },
      "5": {
        digitsAmountMax: 1,
        elementsAmount: 3,
        unknownAmount: 2,
        unknowPosition: "resultOnly"
      },
      "6": {
        digitsAmountMax: 1,
        elementsAmount: 3,
        unknownAmount: 2,
        unknowPosition: "any"
      },
      "7": {
        digitsAmountMax: 2,
        elementsAmount: 3,
        unknownAmount: 1,
        unknowPosition: "resultOnly"
      },
      "8": {
        digitsAmountMax: 2,
        elementsAmount: 3,
        unknownAmount: 1,
        unknowPosition: "any"
      },
      "9": {
        digitsAmountMax: 2,
        elementsAmount: 3,
        unknownAmount: 2,
        unknowPosition: "resultOnly"
      },
      "10": {
        digitsAmountMax: 2,
        elementsAmount: 3,
        unknownAmount: 2,
        unknowPosition: "any"
      },
    },
    duration: {
      default: 2,
      min: 1,
      max: 5
    },
    difficulty: {
      defaultLevel: 1,
      minLevel: 1,
      maxLevel: 10
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
