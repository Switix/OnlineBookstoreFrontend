<template>
    <div class="flex items-center justify-center py-4 bg-bg">
        <div class="max-w-md w-full space-y-4  flex flex-col">

            <div class="space-y-4 bg-bg-200 rounded-lg mx-4 shadow-md p-6  ">
                <p class="text-2xl font-bold  ">Profil Użytkownika</p>
                <div class="flex items-end bg-bg/30 rounded p-2">
                    <!-- Ikona osoby -->
                    <div class="mr-4  text-accent focus:outline-none ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-xl">{{ user.name }} {{ user.lastname }}</p>
                    </div>
                </div>
                <div class="flex items-end bg-bg/30 rounded p-2">
                    <!-- Ikona email -->
                    <div class="mr-4  text-accent focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-xl">{{ user.email }}</p>
                    </div>
                </div>
                <div class="flex justify-end">
                    <router-link :to="{ name: 'ProfileEditPage' }"
                        class="px-4 py-2 w-full text-md text-center bg-primary text-text rounded-md hover:bg-primary-200">
                        Edytuj Profil
                    </router-link>
                </div>
            </div>
            <div class="space-y-4 bg-bg-200 rounded-lg mx-4 shadow-md p-6  ">
                <p class="text-2xl font-bold  ">Dane rozliczeniowe</p>
                <div v-if="user.billingAddress" class="flex flex-col">
                    <BillingAddress :billingAddress="user.billingAddress"/>

                </div>
                <div v-else class="bg-bg/30 rounded p-2">
                    <p class="text-lg text-text-200">Brak adresów</p>
                </div>
                <div class="flex space-x-4 w-full">
                    <button v-if="user.billingAddress"
                    @click="deleteBillingAddress"
                            class="px-4 py-2 w-1/2 text-center bg-accent-200 text-text rounded-md hover:bg-primary-200">
                            <span class="text-md">Usuń adres </span>
                        </button>
                    <router-link :to="{ name: 'BillingAddressEditPage' }"
                        class="px-4 py-2  text-center bg-primary text-text rounded-md hover:bg-primary-200"
                        :class="[user.billingAddress ? 'w-1/2' : 'w-full']">
                        <span class="text-md">{{ user.billingAddress ? 'Edytuj adres' : 'Dodaj adres' }}</span>
                    </router-link>
                </div>
            </div>
            <div class="space-y-4 bg-bg-200 rounded-lg mx-4 shadow-md p-6  ">
                <p class="text-2xl font-bold  ">Adres dostawy</p>
                <div v-if="user.shippingAddresses.length == 0" class="bg-bg/30 rounded p-2">
                    <p class="text-lg text-text-200">Brak adresów</p>
                </div>

                <div v-else v-for="address in user.shippingAddresses" :key="address.id"
                    class="bg-bg/30 flex flex-col items-start space-y-4 rounded p-2">

                   <ShippingAddress :shippingAddress="address"/>
                    <div class="flex space-x-4 w-full ">
                        <button @click="deleteShippingAddress(address.id)"
                            class="px-4 py-2 w-1/2 text-center bg-accent-200 text-text rounded-md hover:bg-primary-200">
                            <span class="text-md">Usuń adres </span>
                        </button>
                        <router-link :to="{ name: 'ShippingAddressEditPage', params: { id: address.id } }"
                            class="px-4 py-2 w-1/2 text-center bg-primary text-text rounded-md hover:bg-primary-200">
                            <span class="text-md">Edytuj adres </span>
                        </router-link>
                    </div>
                </div>

                <div class="flex justify-end">
                    <router-link :to="{ name: 'ShippingAddressEditPage', params: { id: null } }"
                        class="px-4 py-2 w-full text-center bg-primary text-text rounded-md hover:bg-primary-200">
                        <span class="text-md">Dodaj adres</span>
                    </router-link>
                </div>
            </div>
        </div>

    </div>
</template>
  
<script>
import BillingAddress from '@/components/BillingAddress'
import ShippingAddress from '@/components/ShippingAddress'
export default {
    components: {
        BillingAddress,
        ShippingAddress
    },
    computed: {
        user() {     
            return this.$store.state.user.user;
        }
    },
    methods:{
        async deleteShippingAddress(shippingAddressId) {         
           await this.$store.dispatch('user/deleteShippingAddress', shippingAddressId);
        },
        async deleteBillingAddress(){
            await this.$store.dispatch('user/deleteBillingAddress',this.user.billingAddress.id);
        }
    },
};
</script>
  
<style></style>
  