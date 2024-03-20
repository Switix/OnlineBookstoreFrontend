<template>
    <div v-if="selectedOrder && orderItems" class="flex items-center justify-center mx-4 py-4 bg-bg">

        <div class="max-w-md w-full space-y-4  flex flex-col">
            <div class=" bg-bg-200 rounded-lg shadow-md p-4 flex flex-col justify-start">
                <OrderElement :order="selectedOrder" />
            </div>

            <div class="space-y-4 bg-bg-200 rounded-lg  shadow-md p-6 ">
                <p class="text-2xl font-bold  ">Zakupione książki</p>
                <div v-for="orderItem in orderItems" :key="orderItem.id">
                    <RouterLink :to="'/book/' + orderItem.book.id" class="flex items-center bg-bg/30 rounded p-2">
                         <!-- obrazek książki -->                   
                         <img :src="orderItem.book.img" alt="book image" class=" max-h-48 w-5/12 max-w-28 min-h-32 ">
                        <div class="p-2 text-center flex flex-col items-center w-full" >
                            <!-- Tytuł książki -->
                            <h2 class="text-lg font-bold mb-2 line-clamp-2 ">{{ orderItem.book.title }}</h2>
                            <!-- Autorzy książki -->
                            <p class="text-md mb-2 line-clamp-2">{{ orderItem.book.bookAuthors.map(author =>author.name).join(',') }}</p>
                            <!--zakupiona ilość-->
                            <p  class=" text-base mb-2  text-primary-200">Ilość: {{ orderItem.quantity }}</p >
                        </div>
                    </RouterLink>
                   
                    
                </div>
            </div>

            <div class="space-y-4 bg-bg-200 rounded-lg  shadow-md p-6 ">
                <p class="text-2xl font-bold  ">Adres rozliczeniowy</p>
                <BillingAddress :billingAddress = selectedOrder.billingAddress />
            </div>
            <div class="space-y-4 bg-bg-200 rounded-lg  shadow-md p-6 ">
                <p class="text-2xl font-bold  ">Adres dostawy</p>
                <div class="bg-bg/30 space-y-4 rounded p-2">
                    <ShippingAddress :shippingAddress="selectedOrder.shippingAddress" />
                </div>
            </div>
           
        </div>
    </div>


</template>

<script>
import OrderElement from '@/components/OrderElement'
import BillingAddress from '@/components/BillingAddress'
import ShippingAddress from '@/components/ShippingAddress'

export default {
    components: {
        OrderElement,
        BillingAddress,
        ShippingAddress,
    },
    computed: {
        selectedOrder() {
            return this.$store.state.order.selectedOrder;
        },
        orderItems() {
            return this.$store.state.order.orderItems;
        },
    },
    created() {
        const id = this.$route.params.id;
        this.$store.dispatch('order/fetchOrder', id);
        this.$store.dispatch('order/fetchOrderItems', id);
    },
};
</script>
