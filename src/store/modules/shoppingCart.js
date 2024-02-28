import axios from 'axios'
import { fetchAndSetBookImage } from '@/utils/bookUtils';


export default {
    namespaced: true,
    state: {
        cartItems: [],
        cartTotal: '',
    },
    mutations: {
        SET_CART_ITEMS(state, cartItems) {
            state.cartItems = cartItems;
        },
        SET_CART_TOTAL(state, cartTotal) {
            state.cartTotal = cartTotal;
        },

    },
    actions: {
        async fetchCartItems({ commit, dispatch }) {
            const response = await axios.get('http://localhost:8080/api/shopping/cartItems', { withCredentials: true });
            const cartItems = response.data;
            for (const cartItem of cartItems) {
                await fetchAndSetBookImage(cartItem.book);
            }
            commit('SET_CART_ITEMS', cartItems);
            dispatch('getCartTotal');
        },
        async getCartTotal({ commit }) {
            await axios.get('http://localhost:8080/api/shopping/total', { withCredentials: true })
                .then(response => {
                    commit('SET_CART_TOTAL', response.data.total);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async addCartItem(_, cartItem) {
            await axios.post('http://localhost:8080/api/shopping/cartItems', cartItem, { withCredentials: true })
                .catch(error => {
                    console.log(error);
                });
        },
        async removeCartItem(_, id) {
            await axios.delete('http://localhost:8080/api/shopping/cartItems/' + id, { withCredentials: true })
                .catch(error => {
                    console.log(error);
                });
        },
        async updateCartItem(_, cartItem) {
            await axios.patch('http://localhost:8080/api/shopping/cartItems/' + cartItem.id, { quantity: cartItem.quantity }, { withCredentials: true })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    getters: {
    }
};
