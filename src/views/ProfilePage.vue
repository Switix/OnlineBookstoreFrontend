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
                    <div class="flex items-center  bg-bg/30 rounded p-2">
                        <!-- Ikona osoby -->
                        <div class="mr-4  text-accent focus:outline-none">
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
                    <div class="mt-2">
                        <div class="flex flex-col items-start space-y-4  bg-bg/30 rounded p-2">
                            <div class="flex items-center">
                                <!-- Ikona domu -->
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6 mr-4 text-accent focus:outline-none">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>

                                <span class="text-lg ">{{ user.billingAddress.street }} {{
                                    user.billingAddress.buildingNumber }}
                                    <span v-if="user.billingAddress.apartmentNumber">/ {{
                                        user.billingAddress.apartmentNumber }}</span>
                                </span>
                            </div>
                            <div class="flex items-center">
                                <!-- Ikona biurowca -->
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6 mr-4 text-accent focus:outline-none">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                                </svg>
                                <span class="text-lg">{{ user.billingAddress.zipCode }} {{
                                    user.billingAddress.city.cityName }}</span>
                            </div>
                            <div class="mt-2 flex items-center">
                                <!-- Ikona telefonu -->
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6 mr-4 text-accent focus:outline-none">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>

                                <span class="text-lg">{{ user.billingAddress.phoneNumber }}</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div v-else class="bg-bg/30 rounded p-2">
                    <p class="text-lg text-text-200">Brak adresów</p>
                </div>
                <div class="flex justify-end">
                    <router-link :to="{ name: 'BillingAddressEditPage' }"
                        class="px-4 py-2 w-full text-center bg-primary text-text rounded-md hover:bg-primary-200">
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

                    <div class="flex items-center">
                        <!-- Ikona dla Nazwy -->
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6 mr-4 text-accent focus:outline-none">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        <span class="text-lg ">{{ address.name }}</span>
                    </div>
                    <div class="flex items-center">
                        <!-- Ikona domu -->
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6 mr-4 text-accent focus:outline-none">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>

                        <span class="text-lg ">{{ address.street }} {{
                            address.buildingNumber }}
                            <span v-if="address.apartmentNumber">/ {{
                                address.apartmentNumber }}</span>
                        </span>
                    </div>
                    <div class="flex items-center">
                        <!-- Ikona biurowca -->
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6 mr-4 text-accent focus:outline-none">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                        <span class="text-lg">{{ address.zipCode }} {{
                            address.city.cityName }}</span>
                    </div>
                    <div class="flex space-x-4 w-full">
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
export default {
    computed: {
        user() {
            
            return this.$store.state.user.user;
        }
    },
    methods:{
        async deleteShippingAddress(shippingAddressId) {         
           await this.$store.dispatch('user/deleteShippingAddress', shippingAddressId);
        },
    },
};
</script>
  
<style></style>
  