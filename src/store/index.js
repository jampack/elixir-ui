import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    layout: '',
    navDrawer: true,
    auth: false,
    user: {},
  },
  getters: {
    GET_LAYOUT(state) {
      return state.layout;
    },
    GET_NAV_DRAWER(state) {
      return state.navDrawer;
    },
    GET_AUTH(state) {
      return state.auth;
    },
    GET_USER(state) {
      return state.user;
    },
  },
  mutations: {
    SET_LAYOUT(state, payload) {
      state.layout = payload;
    },
    TOGGLE_NAV_DRAWER(state) {
      state.navDrawer = !state.navDrawer;
    },
    SET_NAV_DRAWER(state, payload) {
      state.navDrawer = payload;
    },
    SET_AUTH(state, payload) {
      state.auth = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
