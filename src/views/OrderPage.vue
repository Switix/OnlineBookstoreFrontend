<template>
    <div class="flex items-center justify-center mx-4 py-4 bg-bg">
        <div class="max-w-md w-full space-y-4  flex flex-col">

            <div class="space-y-2 bg-bg-200 rounded-lg shadow-md p-6  ">
                <p class="text-2xl font-bold ">Aktywne zamówienia</p>
                <div v-if="activeOrders.length == 0" class="text-lg"> Brak aktywnych zamówień</div>
                <RouterLink  v-else v-for="(order) in activeOrders " :key="order.id"
                    :to="'/orders/' + order.id" class=" bg-bg rounded-lg shadow-md p-4 flex flex-col justify-start">
                    <OrderElement :order=order></OrderElement>
                </RouterLink>
            </div>

            <div class="space-y-4 bg-bg-200 rounded-lg shadow-md p-6  ">
                <p class="text-2xl font-bold  ">Archiwizowane zamówienia</p>
                <div v-if="archivedOrders.length == 0" class="text-lg"> Brak archiwizowanych zamówień</div>
                <RouterLink v-else v-for="(order) in archivedOrders " :key="order.id"
                    class=" bg-bg rounded-lg shadow-md p-4 flex flex-col justify-start">
                    <OrderElement :order=order></OrderElement>
                </RouterLink>
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
    computed: {
        activeOrders() {
            return this.$store.getters['order/activeOrders'];
        },
        archivedOrders() {
            return this.$store.getters['order/archivedOrders'];
        },
    },
    created() {
        this.$store.dispatch('order/fetchOrders');
    },
};
</script>
