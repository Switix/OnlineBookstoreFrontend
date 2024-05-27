import { createStore } from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

import user from './modules/user';
import shoppingCart from './modules/shoppingCart';
import book from './modules/book';
import order from './modules/order';
import admin from './modules/admin';

export default createStore({
  state: {
    phoneWidth: 640,
    cities: [],
  },
  mutations: {
    SET_CITIES(state, cities) {
      state.cities = cities;
    },
  },
  actions: {
    async fetchCities({ commit }) {
      try {
        const response = await axios.get('http://localhost:8080/api/cities');
        commit('SET_CITIES', response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    // Your getters here
  },
  modules: {
    user,
    book,
    shoppingCart,
    order,
    admin,
  },
  plugins: [
    createPersistedState(),
  ],
});
