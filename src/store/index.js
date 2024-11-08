import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    SentenceReadingMode: true,
    readingSpeed: 100,
    readingSpeedItems: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200],
    bookName: localStorage.bookName,
  },
  mutations: {
    setReadingMode(state, mode) {
      state.SentenceReadingMode = mode;
    },
    setReadingSpeed(state, speed) {
      state.readingSpeed = speed;
    },
    setBookName(state, bookName) {
      state.bookName = bookName;
      localStorage.bookName = bookName;
    },
  },
  actions: {},
  modules: {},
});
