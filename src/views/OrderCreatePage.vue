<template>
    <div class="flex items-center justify-center mx-4 py-4 bg-bg">
        <div class="max-w-md w-full space-y-4  flex flex-col">
            <div class="space-y-4 bg-bg-200 rounded-lg shadow-md p-6  ">
                <p class="text-2xl font-bold  ">Dane rozliczeniowe</p>
                <div v-if="user.billingAddress" class="flex flex-col">
                    <BillingAddress :billingAddress = user.billingAddress />
                </div>
                <div v-else class="bg-bg/30 rounded p-2">
                    <BillingAddressEdit :redirect="false" />
                </div>
            </div>
            <div class="space-y-4 bg-bg-200 rounded-lg  shadow-md p-6  ">
                <p class="text-2xl font-bold  ">Adres dostawy</p>
                <div v-if="user.shippingAddresses.length == 0" class="bg-bg/30 rounded p-2">
                    <ShippingAddressEdit :redirect="false" />
                </div>
                <div v-else v-for="(address, index) in user.shippingAddresses" :key="address.id"
                    class="bg-bg/30 flex flex-col items-start space-y-4 border-2 border-transparent rounded p-2 cursor-pointer"
                    :class="{ '!border-primary': selectedShippingAddressIndex === index }"
                    @click="selectShippingAddressIndex(index)">
                    <ShippingAddress :shippingAddress="address"></ShippingAddress>
                </div>
            </div>

            <!--summary-->
            <ShoppingCartSummary>
                <button @click="goToShipmentStage"
                    class="px-4 py-2 text-center bg-primary text-text rounded-md hover:bg-primary-200">
                    <span class="text-md">Przejdź do płatności</span>
                </button>
                <span v-if="errorMsg" class="text-center text-accent">{{ errorMsg }}</span>
            </ShoppingCartSummary>
        </div>

    </div>
</template>
<script>
import BillingAddress from '@/components/BillingAddress'
import ShippingAddress from '@/components/ShippingAddress'
import BillingAddressEdit from '@/components/BillingAddressEdit'
import ShippingAddressEdit from '@/components/ShippingAddressEdit'
import ShoppingCartSummary from '@/components/ShoppingCartSummary'

import router from '@/router';
export default {
    components: {
        BillingAddress,
        BillingAddressEdit,
        ShippingAddress,
        ShippingAddressEdit,
        ShoppingCartSummary
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
        selectedShippingAddressIndex(){
            return this.$store.state.order.selectedShippingAddressIndex;
        }
    },
    data() {
        return {
            errorMsg: ''
        };
    },
    methods: {
        selectShippingAddressIndex(index){
            this.$store.dispatch('order/selectShippingAddressIndex',index);
        },
        goToShipmentStage() {
            this.errorMsg = '';
            if (this.user.billingAddress === null) {
                this.errorMsg = 'Nie ustawiono adresu rozliczeniowego';
                return;
            }
            if (this.user.shippingAddresses[this.selectedShippingAddressIndex] === undefined) {
                this.errorMsg = 'Nie ustawiono adresu dostawy';
                return;
            }
 
            router.push({ name: "ShipmentPage" })
        },
    },
};
</script>
