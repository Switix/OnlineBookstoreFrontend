<template>
    <div class="flex items-center justify-center mx-4 py-4 bg-bg">
        <div class="max-w-md w-full space-y-4  flex flex-col">
            <div class="space-y-4 bg-bg-200 rounded-lg shadow-md p-6">
                <div class="flex space-x-2">
                    <input v-model="orderSearchId" type="text" placeholder="Szukaj po id"
                        class="p-2 border border-primary-200 focus:border-primary focus:outline-none rounded w-full bg-bg" />
                    <button @click="serachOrderById" class="px-4 py-2  text-center bg-primary text-text rounded-md ">
                        <span class="text-md ">Szukaj </span>
                    </button>
                </div>
                <div v-if="searchedOrder">
                    <p class="text-lg text-text mb-2">Wyszukane zamówienie</p>
                    <div class="bg-bg rounded-lg shadow-md p-4 relative">
                        <RouterLink :to="{ name: 'OrderDetailsPage', params: { id: searchedOrder.id } }">
                            <OrderElement :order="searchedOrder" :editable=true></OrderElement>
                        </RouterLink>
                        <button @click="showRemoveOrderModal(searchedOrder)"
                            class="bg-accent/10 p-0.5 rounded-full absolute top-2 right-2">
                            <svg class="w-5 h-5 text-accent cursor-pointer" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>

                <p v-else class="text-accent !-mt-0">{{ searchedOrderError }}</p>
                <p class="text-lg text-text  !-mb-2">Zamówiena do realizacji</p>
                <div v-for="(order) in orderedOrders" :key="order.id"
                    class="bg-bg rounded-lg shadow-md p-4 flex flex-col justify-start relative ">
                    <RouterLink :to="{ name: 'OrderDetailsPage', params: { id: order.id } }">
                        <OrderElement :order="order" :editable=true></OrderElement>
                    </RouterLink>
                    <button @click="showRemoveOrderModal(order)"
                        class="bg-accent/10 p-0.5 rounded-full absolute top-2 right-2">
                        <svg class="w-5 h-5 text-accent cursor-pointer" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <!--Modal-->
        <div v-if="removeOrderModal" class="fixed z-10 inset-0 overflow-y-auto ">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <!-- Background overlay -->
                <div class="fixed inset-0 " aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500/75"></div>
                </div>

                <!-- Modal dialog -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    class="inline-block align-bottom bg-bg rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-bg px-4 p-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg leading-6 font-medium text-text">
                                    Czy na pewno chcesz usunąć to zamówienie?
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div class="bg-bg-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button @click="removeOrder" type="button"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-accent-200 text-base font-medium sm:ml-3 sm:w-auto sm:text-sm">
                            Tak
                        </button>
                        <button @click="removeOrderModal = false; orderToRemove = ''" type="button"
                            class="mt-3 w-full inline-flex justify-center rounded-md  shadow-sm px-4 py-2 bg-primary text-base font-medium   sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Nie
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


import OrderElement from '@/components/OrderElement.vue'
export default {
    components: {
        OrderElement
    },
    data() {
        return {
            orderSearchId: '',
            removeOrderModal: false,
            orderToRemove: '',
        };
    },
    computed: {
        searchedOrderError() {
            return this.$store.state.admin.searchedOrderError;
        },
        searchedOrder() {
            return this.$store.state.admin.searchedOrder;
        },
        orderedOrders() {
            return this.$store.getters['admin/orderedOrders'];
        },
    },
    methods: {
        serachOrderById() {
            this.$store.dispatch('admin/searchOrderById', this.orderSearchId);
        },
        showRemoveOrderModal(order) {
            this.orderToRemove = order;
            this.removeOrderModal = true;
        },
        removeOrder() {
            this.$store.dispatch('admin/removeOrder', this.orderToRemove.id);
            this.orderToRemove = '';
            this.removeOrderModal = false;
        }
    },
    created() {
        this.$store.dispatch('admin/fetchOrders');
    },
};
</script>
