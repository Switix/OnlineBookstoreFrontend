<template>
    <div class="flex items-center justify-center py-4 bg-bg">
        <div class="max-w-md w-full space-y-4  flex flex-col">
            <div class="space-y-4 bg-bg-200 rounded-lg mx-4 shadow-md p-6 ">
                <h2 class="text-2xl font-bold text-center mb-4">Edycja Adresu rozliczeniowego</h2>
                <form @submit.prevent="updateBillingAddress" class="space-y-4">
                    <div>
                        <label for="phoneNumber" class="block font-semibold">Telefon Kontaktowy</label>
                        <input v-model="billingAddressChange.phoneNumber" type="text" id="phoneNumber" name="phoneNumber"
                            required
                            class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none border-white focus:border-primary-200  focus:ring-primary-200">
                    </div>
                    <div>
                        <label for="street" class="block font-semibold">Nazwa ulicy</label>
                        <input v-model="billingAddressChange.street" type="text" id="street" name="street" required
                            class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none border-white focus:border-primary-200  focus:ring-primary-200">
                    </div>
                    <div class="flex space-x-4">
                        <div class="flex flex-col">
                            <label for="buildingNumber" class="block font-semibold">Numer budynku</label>
                            <input v-model="billingAddressChange.buildingNumber" type="text" id="buildingNumber" required
                                name="buildingNumber"
                                class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none border-white focus:border-primary-200  focus:ring-primary-200">
                        </div>
                        <div class="flex flex-col">
                            <label for="apartmentNumber" class="block font-semibold">Numer lokalu</label>
                            <input v-model="billingAddressChange.apartmentNumber" type="text" id="apartmentNumber"
                                name="apartmentNumber"
                                class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none border-white focus:border-primary-200  focus:ring-primary-200">
                        </div>
                    </div>
                    <div class="flex space-x-4">
                        <div class="w-2/5">
                            <label for="zipCode" class="block font-semibold">Kod pocztowy</label>
                            <input v-model="billingAddressChange.zipCode" type="text" id="zipCode" name="zipCode" required
                                class="p-2 w-full bg-bg border rounded-md focus:ring-1 outline-none border-white 
                      focus:border-primary-200 focus:ring-primary-200">
                        </div>
                        <div class="w-3/5 relative">                  
                                <label for="cityName" class="block font-semibold">Miejscowość</label>
                                <input v-model="searchText" type="text" @focus="isDropdownOpen = true" id="cityName" name="cityName" required
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
                                <p v-show="cityError" class="text-accent text-sm mb-1 absolute left-0 px-2 z-10">Wybierz miasto z listy</p>                    
                        </div>
                    </div>
                    <div>
                        <label for="countryName" class="block font-semibold">Kraj</label>
                        <input  type="text" id="countryName" name="countryName"
                            required disabled value="Polska"
                            class="w-full p-2 opacity-70 bg-bg border rounded-md focus:ring-1 outline-none border-white focus:border-primary-200  focus:ring-primary-200">
                    </div>

                    <div class="flex justify-end">
                        <button type="submit" class="px-4 py-2 bg-primary text-text rounded-md hover:bg-primary-200">
                            Zapisz zmiany
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
//import _ from 'lodash';
export default {
    computed: {
        user() {
            return this.$store.state.user;
        },
        cities() {
            return this.$store.state.cities;
        },
        billingAddressChange() {
            return {
                phoneNumber: this.user.billingAddress ? this.user.billingAddress.phoneNumber : '',
                cityId: this.user.billingAddress ? this.user.billingAddress.city.id : '',
                street: this.user.billingAddress ? this.user.billingAddress.street : '',
                apartmentNumber: this.user.billingAddress ? this.user.billingAddress.apartmentNumber : '',
                buildingNumber: this.user.billingAddress ? this.user.billingAddress.buildingNumber : '',
                zipCode: this.user.billingAddress ? this.user.billingAddress.zipCode : '',
                countryId: this.user.billingAddress ? this.user.billingAddress.country.id : 1
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
            cityError: false
        };
    },
    created() {
        this.$store.dispatch('fetchCities');
        this.searchText = this.user.billingAddress ? this.user.billingAddress.city.cityName : '';
    },
    methods: {
        async updateBillingAddress() {
            const cityExists =this.cities.find(city => city.cityName.toLowerCase().startsWith(this.searchText.toLowerCase()));

            if(!cityExists){
                this.cityError = true;
                return;
            } 
            if (this.billingAddressChange.cityId === "" && cityExists.id  !== this.billingAddressChange.cityId) {
                this.cityError = true;
                return;
            }
           await this.$store.dispatch('updateBillingAddress', this.billingAddressChange);
        },
        selectCity(city) {
            this.billingAddressChange.cityId = city.id;
            this.isDropdownOpen = false;
            this.searchText = city.cityName;
            this.cityError = false;
        },
    },

};
</script>
  
<style></style>