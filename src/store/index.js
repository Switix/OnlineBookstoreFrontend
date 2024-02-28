import { createStore } from 'vuex'
import axios from 'axios'



import user from './modules/user';
import shoppingCart from './modules/shoppingCart';
import book from './modules/book';



export default createStore({
  state: {
    cities: [],
  },
  mutations: {

    SET_CITIES(state, cities) {
      state.cities = cities;
    },
  },
  actions: {
    async fetchCities({ commit }) {
      await axios.get('http://localhost:8080/api/cities')
        .then((response) => {
          commit('SET_CITIES', response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },

  },
  getters: {

  },
  modules: {
    user,
    book,
    shoppingCart
  },

})
