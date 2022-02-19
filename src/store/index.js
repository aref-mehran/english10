import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    SentenceReadingMode : true,
    readingSpeed : 1
  },
  mutations: {
      setReadingMode(state, mode){
        state.SentenceReadingMode=mode
      },
      setReadingSpeed( state, mode){
        state.readingSpeed=mode
      }
  },
  actions: {
  },
  modules: {
  }
})
