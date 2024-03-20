<template>
    <form @submit.prevent="updateShippingAddress" class="space-y-4">
                    <div>
                        <label for="name" class="block font-semibold">Nazwa</label>
                        <input v-model="shippingAddressChange.name" type="text" id="name" name="name"
                            required
                            class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none border-white focus:border-primary-200  focus:ring-primary-200">
                    </div>
                    <div>
                        <label for="street" class="block font-semibold">Nazwa ulicy</label>
                        <input v-model="shippingAddressChange.street" type="text" id="street" name="street" required
                            class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none border-white focus:border-primary-200  focus:ring-primary-200">
                    </div>
                    <div class="flex space-x-4">
                        <div class="flex flex-col">
                            <label for="buildingNumber" class="block font-semibold">Numer budynku</label>
                            <input v-model="shippingAddressChange.buildingNumber" type="text" id="buildingNumber" required
                                name="buildingNumber"
                                class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none border-white focus:border-primary-200  focus:ring-primary-200">
                        </div>
                        <div class="flex flex-col">
                            <label for="apartmentNumber" class="block font-semibold">Numer lokalu</label>
                            <input v-model="shippingAddressChange.apartmentNumber" type="text" id="apartmentNumber"
                                name="apartmentNumber"
                                class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none border-white focus:border-primary-200  focus:ring-primary-200">
                        </div>
                    </div>
                    <div class="flex space-x-4">
                        <div class="w-2/5">
                            <label for="zipCode" class="block font-semibold">Kod pocztowy</label>
                            <input v-model="shippingAddressChange.zipCode" type="text" id="zipCode" name="zipCode" required
                                class="p-2 w-full bg-bg border rounded-md focus:ring-1 outline-none border-white 
                      focus:border-primary-200 focus:ring-primary-200">
                        </div>
                        <div class="w-3/5 relative">
                            <label for="cityName" class="block font-semibold">Miejscowość</label>
                            <input v-model="searchText" type="text" @focus="isDropdownOpen = true" id="cityName"
                                name="cityName" required
                                class="block w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none" :class="{
                                    'border-accent text-accent focus:border-accent focus:ring-accent': cityError,
                                    'border-white focus:border-primary-200 focus:ring-primary-200': !cityError
                                }" placeholder="Wpisz nazwę miasta" autocomplete="off">

                            <div v-show="isDropdownOpen && filteredCities.length > 0"
                                class="absolute z-10 w-full bg-bg border rounded-md mt-1 shadow-lg max-h-32 overflow-y-auto">
                                <div v-if="isDropdownOpen" class="bg-transparent fixed inset-0 -z-10"
                                    @click="selectCity(filteredCities[0])"></div>
                                <div v-for="city in filteredCities" :key="city.id" @click="selectCity(city)"
                                    class="p-2 hover:bg-gray-100 cursor-pointer">{{ city.cityName }}</div>
                            </div>
                            <p v-show="cityError" class="text-accent text-sm mb-1 absolute left-0 px-2 ">Wybierz miasto
                                z listy</p>
                        </div>
                    </div>
                    <div>
                        <label for="countryName" class="block font-semibold">Kraj</label>
                        <input type="text" id="countryName" name="countryName" required disabled value="Polska"
                            class="w-full p-2 opacity-70 bg-bg border rounded-md focus:ring-1 outline-none border-white focus:border-primary-200  focus:ring-primary-200">
                    </div>

                    <div class="flex justify-end">
                        <button type="submit" class="px-4 py-2 bg-primary text-text rounded-md hover:bg-primary-200">
                            Zapisz zmiany
                        </button>
                    </div>
                </form>
</template>
<script>
//import _ from 'lodash';
import router from '@/router';
export default {
    props: {
        redirect: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
        cities() {
            return this.$store.state.cities;
        },
        shippingAddressChange() {
            const {
                id = '',
                name = '',
                city = {},
                street = '',
                apartmentNumber = '',
                buildingNumber = '',
                zipCode = '',
                country = {}
            } = this.shippingAddress || {};

            return {
                id,
                name,
                cityId: city.id || '',
                street,
                apartmentNumber,
                buildingNumber,
                zipCode,
                countryId: country.id || 1
            };

        },
        filteredCities() {
            const searchText = this.searchText ? this.searchText.toLowerCase() : '';
            return this.cities.filter(city => city.cityName.toLowerCase().startsWith(searchText));
        },
    },
    data() {
        return {
            isDropdownOpen: false,
            searchText: '',
            cityError: false,
            shippingAddress:''
        };
    },
    created() {
        
        this.shippingAddress = this.user.shippingAddresses.find(address => address.id == this.$route.params.id) || null;
        this.$store.dispatch('fetchCities');
        this.searchText = this.shippingAddress ? this.shippingAddress.city.cityName : '';
    },
    methods: {
        async updateShippingAddress() {
            const cityExists = this.cities.find(city => city.cityName.toLowerCase().startsWith(this.searchText.toLowerCase()));

            if (!cityExists) {
                this.cityError = true;
                return;
            }
            if (this.shippingAddressChange.cityId === "" && cityExists.id !== this.shippingAddressChange.cityId) {
                this.cityError = true;
                return;
            }
            if(this.$route.params.id == null){
                await this.$store.dispatch('user/createShippingAddress', this.shippingAddressChange);
            }
            else{
                await this.$store.dispatch('user/updateShippingAddress', this.shippingAddressChange);
            }
            if(this.redirect){
                router.go(-1);
            }
        },
        selectCity(city) {
            this.shippingAddressChange.cityId = city.id;
            this.isDropdownOpen = false;
            this.searchText = city.cityName;
            this.cityError = false;
        },
    },

};
</script>