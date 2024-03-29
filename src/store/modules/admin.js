import axios from 'axios';
import Author from '@/components/model/Author';
import { convertToOrder } from '@/utils/orderUtils';

export default {
    namespaced: true,
    state: {
        //order manage
        orders: [],
        searchedOrder: '',
        searchedOrderError: '',

        //author manage
        suggestedAuthors: [],


    },
    mutations: {
        //order manage
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

        //author manage
        SET_SUGGESTED_AUTHORS(state, authors) {
            state.suggestedAuthors = authors;
        },
        CLEAR_AUTHOR_SEARCH(state) {
            state.suggestedAuthors = [];
        },
        REMOVE_AUTHOR(state, authorId) {
            state.suggestedAuthors = state.suggestedAuthors.filter(author => author.id !== authorId);
        },
        ADD_AUTHOR(state, author) {
            state.suggestedAuthors.push(author);
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
                commit('REMOVE_ORDER', orderId);

            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        },
        setSearchedOrderError({ commit }, searchedOrderError) {
            commit('SET_SEARCHED_ORDER_ERROR', searchedOrderError);
        },

        //author manage
        async searchAuthorByName({ commit }, authorName) {
            try {
                const response = await axios.get('http://localhost:8080/api/search/authors', {
                    params: { q: authorName },
                    withCredentials: true
                });
                commit('SET_SUGGESTED_AUTHORS', response.data.map(authorData => {
                    return new Author(authorData.id, authorData.name);
                }));

            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }

        },
        async updateAuthor(_, updateData) {
            try {
                await axios.patch('http://localhost:8080/api/authors/admin', updateData, { withCredentials: true });

            } catch (error) {

                console.error('Błąd podczas pobierania danych:', error);
            }
        },
        async removeAuthor({ commit }, authorId) {
            try {
                await axios.delete('http://localhost:8080/api/authors/admin/' + authorId, { withCredentials: true });
                commit('REMOVE_AUTHOR', authorId);

            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        },
        async addAuthor({ commit }, authorData) {
            try {
                const response = await axios.post('http://localhost:8080/api/authors/admin', authorData, { withCredentials: true });

                const location = response.headers.location;
                axios.get(location, { withCredentials: true })
                    .then(response => {
                        // Handle the successful response, commit the author data to the state
                        commit('ADD_AUTHOR', new Author(response.data.id, response.data.name));
                    })
                    .catch(error => {
                        console.error('Błąd podczas pobierania danych:', error);
                    });
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        },
        clearAuthorSearch({ commit }) {
            commit('CLEAR_AUTHOR_SEARCH');

        }

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
