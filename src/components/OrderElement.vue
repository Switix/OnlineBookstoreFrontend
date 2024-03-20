<template>
        
            <p class="text-lg">Id zamówienia: {{ order.id }}</p>
            <p class="text-lg ">{{ order.createdAt }} </p>
            <p class="text-lg flex justify-between">
                <span>{{ order.total }}zł. </span>
                <span :class="getStatusClass(order.orderStatus)">{{ order.orderStatus }}</span>
            </p>
</template>

<script>
import Order from '@/components/model/Order';
export default {
    props: {
        order: Order,
    },
    methods: {
        getStatusClass(orderStatus) {
            switch (orderStatus) {
                case 'Nieopłacone':
                    return 'text-accent-200';
                case 'Opłacone':
                    return 'text-primary-200';
                case 'W realizacji':
                    return 'text-green-500';
                case 'Wysłane':
                    return 'text-gray-300';
                default:
                    return '';
            }
        }
    }
};

</script>