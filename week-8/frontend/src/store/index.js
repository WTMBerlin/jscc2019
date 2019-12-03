import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
    meetups: [],
    meetup: {}
  },
  mutations: {
    SET_COUNTER(state, newCount) {
      state.counter = newCount
    },
    SET_MEETUPS(state, data) {
      state.meetups = data
    },
    SET_MEETUP(state, data) {
      state.meetup = data
    }
  },
  actions: {
    incrementCounter({ commit, state }) {
      const newCount = state.counter + 1
      commit('SET_COUNTER', newCount)
    },
    async fetchMeetups({ commit }) {
      const result = await axios.get(`${process.env.VUE_APP_API_URL}/meetup/all/json`)
      commit('SET_MEETUPS', result.data)
    },
    async fetchMeetup({ commit }, id) {
      const result = await axios.get(`${process.env.VUE_APP_API_URL}/meetup/${id}/json`)
      commit('SET_MEETUP', result.data)
    }
  },
  modules: {
  }
})
