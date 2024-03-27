import axios from 'axios';
import { convertToOrder } from '@/utils/orderUtils';

export default {
    namespaced: true,
    state: {
        orders: [],
        searchedOrder: '',
        searchedOrderError: ''

    },
    mutations: {
        SET_ORDERS(state, orders) {
            state.orders = orders;
        },
        SET_SEARCHED_ORDER(state, searchedOrder) {
            state.searchedOrder = searchedOrder;
        },
        SET_SEARCHED_ORDER_ERROR(state, searchedOrderError) {
            state.searchedOrderError = searchedOrderError;
        },
        REMOVE_ORDER(state, orderId) {
            state.orders = state.orders.filter(order => order.id !== orderId);
            if (state.searchedOrder && state.searchedOrder.id === orderId) {
                state.searchedOrder = null;
            }
        },

    },
    actions: {
        async fetchOrders({ commit }) {
            try {
                const response = await axios.get('http://localhost:8080/api/orders/admin', { withCredentials: true });
                const orders = response.data.map(ordersData => {
                    return convertToOrder(ordersData);
                });
                commit('SET_ORDERS', orders);
                commit('SET_SEARCHED_ORDER_ERROR', '');
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        },
        async searchOrderById({ commit }, orderId) {
            try {
                const response = await axios.get('http://localhost:8080/api/orders/' + orderId, { withCredentials: true });
                const searchedOrder = convertToOrder(response.data);
                commit('SET_SEARCHED_ORDER', searchedOrder);
                commit('SET_SEARCHED_ORDER_ERROR', '');
            } catch (error) {
                if (error.response.status == 404) {
                    commit('SET_SEARCHED_ORDER_ERROR', 'Nie znaleziono zamówiena o podanym id');
                    commit('SET_SEARCHED_ORDER', '');
                }
                console.error('Błąd podczas pobierania danych:', error);
            }
        },
        async updateOrder(_, updateData) {
            try {
                await axios.patch('http://localhost:8080/api/orders/admin', updateData, { withCredentials: true });

            } catch (error) {

                console.error('Błąd podczas pobierania danych:', error);
            }
        },
        async removeOrder({ commit }, orderId) {
            try {
                await axios.delete('http://localhost:8080/api/orders/admin/' + orderId, { withCredentials: true });
                commit('REMOVE_ORDER',orderId);
                
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        },
        setSearchedOrderError({ commit }, searchedOrderError) {
            commit('SET_SEARCHED_ORDER_ERROR', searchedOrderError);
        },

    },

    getters: {
        orderedOrders(state) {
            return state.orders.slice().sort((a, b) => {
                // Assuming createdAt is a Date object
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        }
    }
};
