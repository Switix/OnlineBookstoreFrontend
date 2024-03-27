import axios from 'axios'
import User from '@/components/model/User';
import router from '@/router';


export default {
  namespaced: true,
  state: {
    isLoggedIn: false,
    isAdmin:false,
    user: null,
    loginError: '',
    emailError: '',

  },
  mutations: {
    SET_IS_LOGGED_IN(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    SET_IS_ADMIN(state, isAdmin){
      state.isAdmin = isAdmin;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_LOGIN_ERROR(state, errorMessage) {
      state.loginError = errorMessage;
    },
    SET_EMAIL_ERROR(state, emailError) {
      state.emailError = emailError;
    },
    SET_USER_BILLING_ADDRESS(state, billingAddress) {
      state.user.billingAddress = billingAddress;
    },
    ADD_SHIPPING_ADDRESS(state, newAddress) {
      state.user.shippingAddresses.push(newAddress);
    },
    REMOVE_SHIPPING_ADDRESS(state, shippingAddressId) {
      state.user.shippingAddresses = state.user.shippingAddresses.filter(address => address.id !== shippingAddressId);
    },
    UPDATE_SHIPPING_ADDRESS(state, { index, newAddress }) {
      state.user.shippingAddresses.splice(index, 1, newAddress);
    },

  },
  actions: {
    async logout({ commit }) {

      await axios.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true })
        .then(async () => {
          await router.push('/');
          commit('SET_USER', null);
          commit('SET_IS_LOGGED_IN', false);
          commit('SET_IS_ADMIN', false);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async login({ commit }, userData) {
      await axios.post('http://localhost:8080/api/auth/login', userData, {
        withCredentials: true
      })
        .then(response => {
          const user = new User(
            response.data.id,
            response.data.name,
            response.data.lastname,
            response.data.email,
            response.data.role,
            response.data.billingAddress,
            response.data.shippingAddresses
          );
          commit('SET_USER', user);
          commit('SET_IS_LOGGED_IN', true);
          commit('SET_IS_ADMIN', user.role=="ROLE_ADMIN");
          commit('SET_LOGIN_ERROR', '');
        })
        .catch(() => {
          commit('SET_USER', null);
          commit('SET_IS_LOGGED_IN', false);
          commit('SET_LOGIN_ERROR', 'Błędne dane logowania. Spróbuj ponownie.');

        });

    },
    async updateUserProfile({ commit }, profileChange) {
      await axios.patch('http://localhost:8080/api/user/profile', profileChange, { withCredentials: true })
        .then((response) => {
          const user = new User(
            response.data.id,
            response.data.name,
            response.data.lastname,
            response.data.email,
            response.data.role,
            response.data.billingAddress,
            response.data.shippingAddresses
          );
          commit('SET_USER', user);
          commit('SET_IS_LOGGED_IN', true);
          commit('SET_IS_ADMIN', user.role=="ROLE_ADMIN");
          router.push('/profile');
        })
        .catch((error) => {
          throw error;
        });
    },
    async updateUserPassword(_, passwordChange) {
      await axios.patch('http://localhost:8080/api/user/changePassword', passwordChange, { withCredentials: true })
        .then(() => {
          router.push('/profile');
        })
        .catch((error) => {
          throw error;
        });
    },
    async updateBillingAddress({ commit }, billingAddressChange) {
      await axios.patch('http://localhost:8080/api/billingAddress', billingAddressChange, { withCredentials: true })
        .then((response) => {
          commit('SET_USER_BILLING_ADDRESS', response.data)
          commit('SET_IS_LOGGED_IN', true);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async createBillingAddress({ commit }, billingAddressChange) {
      await axios.post('http://localhost:8080/api/billingAddress', billingAddressChange, { withCredentials: true })
        .then((response) => {
          commit('SET_USER_BILLING_ADDRESS', response.data)
          commit('SET_IS_LOGGED_IN', true);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async deleteBillingAddress({ commit }, billingAddressId) {
      await axios.delete('http://localhost:8080/api/billingAddress/' + billingAddressId, { withCredentials: true })
        .then(async () => {
          commit('SET_USER_BILLING_ADDRESS', null);
          commit('SET_IS_LOGGED_IN', true);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async updateShippingAddress({ commit, state }, shippingAddressChange) {
      await axios.patch('http://localhost:8080/api/shippingAddress', shippingAddressChange, { withCredentials: true })
        .then((response) => {
          const AddressIndex = state.user.shippingAddresses.findIndex(address => address.id === response.data.id);
          commit('UPDATE_SHIPPING_ADDRESS', { index: AddressIndex, newAddress: response.data });
          commit('SET_IS_LOGGED_IN', true);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async createShippingAddress({ commit }, shippingAddress) {
      await axios.post('http://localhost:8080/api/shippingAddress', shippingAddress, { withCredentials: true })
        .then(async (response) => {
          commit('ADD_SHIPPING_ADDRESS', response.data);
          commit('SET_IS_LOGGED_IN', true);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async deleteShippingAddress({ commit }, shippingAddressId) {
      await axios.delete('http://localhost:8080/api/shippingAddress/' + shippingAddressId, { withCredentials: true })
        .then(async () => {
          commit('REMOVE_SHIPPING_ADDRESS', shippingAddressId);
          commit('SET_IS_LOGGED_IN', true);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async register({ commit }, userData) {
      await axios.post('http://localhost:8080/api/auth/register', userData, { withCredentials: true })
        .then((response) => {
          const user = new User(
            response.data.id,
            response.data.name,
            response.data.lastname,
            response.data.email,
            response.data.role,
            response.data.billingAddress,
            response.data.shippingAddresses
          );
          commit('SET_USER', user);
          commit('SET_IS_LOGGED_IN', true);
          commit('SET_IS_ADMIN', user.role=="ROLE_ADMIN");
          commit('SET_EMAIL_ERROR', '');
          router.push('/');
        })
        .catch((error) => {
          if (error.response.status == 409) {
            commit('SET_EMAIL_ERROR', 'Ten Email jest już używany');
          }
        });
    },

    setEmailError({ commit }, emailError) {
      commit('SET_EMAIL_ERROR', emailError);
    },
    clearLoginError({ commit }) {
      commit('SET_LOGIN_ERROR', '');
    },
  },
  getters: {
  }
};
