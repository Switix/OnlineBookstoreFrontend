<template>
    <div class="flex items-center justify-center mx-4 py-4 bg-bg">
        <div class="max-w-md w-full space-y-4  flex flex-col">
            <div class="space-y-4 bg-bg-200 rounded-lg shadow-md p-6  ">
                <p class="text-2xl font-bold  ">Sposób płatności</p>
                <PayMethodElement v-for="(payMethod, index) in payMethods " :key="payMethod.id" :img=payMethod.imageUrl
                    :name=payMethod.name :class="{ '!border-primary': selectedPayMethodIndex === index }"
                    @click="selectedPayMethodIndex = index">
                </PayMethodElement>
            </div>
            <div class="space-y-4 bg-bg-200 rounded-lg  shadow-md p-6  ">
                <p class="text-2xl font-bold  ">Sposób dostawy</p>
                <ShipmentMethodElement v-for="(shipmentMethod, index) in shipmentMethods " :key="shipmentMethod.id"
                    :img=shipmentMethod.imageUrl :name=shipmentMethod.name :price=Number(shipmentMethod.price)
                    :class="{ '!border-primary': selectedShipmentMethodIndex === index }"
                    @click="selectedShipmentMethodIndex = index">
                </ShipmentMethodElement>
            </div>

            <!--summary-->
            <ShoppingCartSummary>
                <button @click="goToPayingStage"
                    class="px-4 py-2 text-center bg-primary text-text rounded-md hover:bg-primary-200">
                    <span class="text-md">Zapłać</span>
                </button>
            </ShoppingCartSummary>
        </div>

    </div>
</template>
<script>

import ShoppingCartSummary from '@/components/ShoppingCartSummary.vue'
import PayMethodElement from '@/components/PayMethodElement.vue'
import ShipmentMethodElement from '@/components/ShipmentMethodElement.vue'


export default {
    components: {

        ShoppingCartSummary,
        PayMethodElement,
        ShipmentMethodElement
    },
    data() {
        return {
            selectedPayMethodIndex: 0,
            selectedShipmentMethodIndex: 0,
        }
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
        payMethods() {
            return this.$store.state.order.payMethods;
        },
        shipmentMethods() {
            return this.$store.state.order.shipmentMethods;
        },
    },
    created() {
        this.$store.dispatch('order/fetchPayMethods');
        this.$store.dispatch('order/fetchShipmentMethods');
    },
    methods: {
        goToPayingStage() {
            console.log("Pay simulation")
            const orderData = {
                billingAddressId: this.user.billingAddress.id,
                shippingAddressId: this.user.shippingAddresses[this.$store.state.order.selectedShippingAddressIndex].id,
                payMethodId: this.payMethods[this.selectedPayMethodIndex].id,
                shipmentMethodId: this.shipmentMethods[this.selectedShipmentMethodIndex].id
            };
            this.$store.dispatch('order/createOrder', orderData);
        }
    }

};
</script>
