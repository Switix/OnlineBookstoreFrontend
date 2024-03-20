import axios from 'axios'
import Order from '@/components/model/Order';
import OrderItem from '@/components/model/OrderItem';
import { fetchAndSetBookImage } from '@/utils/bookUtils';



export default {
    namespaced: true,
    state: {
        selectedShippingAddressIndex: 0,
        payMethods: [],
        shipmentMethods: [],
        orders: [],
        selectedOrder: '',
        orderItems: [],
    },
    mutations: {
        SET_SELECTED_SHIPPING_ADDRESS_INDEX(state, selectedShippingAddressIndex) {
            state.selectedShippingAddressIndex = selectedShippingAddressIndex;
        },
        SET_PAY_METHODS(state, payMethods) {
            state.payMethods = payMethods;
        },
        SET_SHIPMENT_METHODS(state, shipmentMethods) {
            state.shipmentMethods = shipmentMethods;
        },
        SET_ORDERS(state, orders) {
            state.orders = orders;
        },
        SET_SELECTED_ORDER(state, selectedOrder) {
            state.selectedOrder = selectedOrder;
        },
        SET_ORDER_ITEMS(state, orderItems) {
            state.orderItems = orderItems;
        },

    },
    actions: {
        async fetchOrders({ commit }) {
            try {
                const response = await axios.get('http://localhost:8080/api/orders', { withCredentials: true });
                const orders = response.data.map(ordersData => {
                    return convertToOrder(ordersData);
                });
                commit('SET_ORDERS', orders);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        },
        async fetchOrder({ commit }, orderId) {
            try {
                const response = await axios.get('http://localhost:8080/api/orders/' + orderId, { withCredentials: true });

                const selectedOrder = convertToOrder(response.data);
                commit('SET_SELECTED_ORDER', selectedOrder);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        },
        async fetchOrderItems({ commit }, orderId) {
            try {
                const response = await axios.get('http://localhost:8080/api/orders/' + orderId + "/orderItems", { withCredentials: true });

                const orderItems = response.data.map(orderItem => { return convertToOrderItem(orderItem) });
                for (const orderItem of orderItems) {
                    await fetchAndSetBookImage(orderItem.book);
                }
                commit('SET_ORDER_ITEMS', orderItems);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        },
        selectShippingAddressIndex({ commit }, index) {
            commit('SET_SELECTED_SHIPPING_ADDRESS_INDEX', index)
        },
        async fetchPayMethods({ commit }) {
            try {
                const response = await axios.get('http://localhost:8080/api/orders/payMethods', { withCredentials: true });
                const payMethods = response.data;

                commit('SET_PAY_METHODS', payMethods);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        },
        async fetchShipmentMethods({ commit }) {
            try {
                const response = await axios.get('http://localhost:8080/api/orders/shipmentMethods', { withCredentials: true });
                const shipmentMethods = response.data;

                commit('SET_SHIPMENT_METHODS', shipmentMethods);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        },
        async createOrder(_, orderData) {
            try {
                await axios.post('http://localhost:8080/api/orders', orderData, { withCredentials: true });
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        }
    },
    getters: {
        activeOrders(state) {
            return state.orders.filter(order => order.orderStatus != "Wysłane");
        },
        archivedOrders(state) {
            return state.orders.filter(order => order.orderStatus == "Wysłane");
        },
    }

};
function convertToOrder(orderData) {
    const date = new Date(parseFloat(orderData.createdAt) * 1000);
    const formatter = new Intl.DateTimeFormat('en', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const formattedDate = formatter.format(date);

    var order = new Order(
        orderData.id,
        orderData.total,
        formattedDate,
        orderData.orderStatus,
        orderData.billingAddress,
        orderData.shippingAddress,
        orderData.payMethod,
        orderData.shipmentMethod,
    );
    return order;

}
function convertToOrderItem(orderItemData) {
    var orderItem = new OrderItem(
        orderItemData.id,
        orderItemData.book,
        orderItemData.quantity,
    );
    return orderItem;

}