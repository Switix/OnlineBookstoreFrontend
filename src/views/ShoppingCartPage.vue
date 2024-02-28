<template>
    <div v-if="cartItems.length != 0" class="flex flex-col justify-center w-full p-4 bg-bg space-y-4">
        <p class="text-2xl font-bold ">Twój koszyk</p>
        <div class="space-y-4 bg-bg-200 rounded-lg shadow-md p-6">
            <!-- cart items-->
            <div v-for="(cartItem, index) in cartItems" :key="cartItem.id" class="flex ">

                <div :class="{ 'border-b-2 border-bg pb-4 ': index !== cartItems.length - 1 }"
                    class="flex items-center w-full max-h-36 ">
                    <div class="mr-4 flex items-center justify-center w-3/12 ">
                        <router-link :to="{ name: 'BookPage', params: { id: cartItem.book.id } }" >
                            <img :src="cartItem.book.img" alt="Book Cover" class=" max-h-28 w-full max-w-24">
                        </router-link>
                    </div>
                    <div class="flex flex-col justify-between pt-1 h-full w-6/12">
                        <router-link :to="{ name: 'BookPage', params: { id: cartItem.book.id } }">
                            <p class="text-lg text-text font-bold line-clamp-2">{{ cartItem.book.title }}</p>
                        </router-link>
                        <p class="text-text-200 text-sm line-clamp-2">{{ cartItem.book.bookAuthors.map(author =>
                            author.name).join(', ') }}</p>
                        <div class="flex flex-row justify-between items-center">
                            <p class="text-primary-200 font-bold flex-1">{{ cartItem.book.price.toFixed(2) }} zł <span
                                    class="text-text font-normal"> / szt.</span> </p>

                        </div>
                    </div>
                    <div class="flex flex-col justify-between items-center h-full w-3/12">
                        <button @click="removeCartItem(cartItem.id)" class="bg-accent/10 p-0.5 rounded-full self-end ">
                            <svg class="w-5 h-5 text-accent cursor-pointer " fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12">
                                </path>
                            </svg>
                        </button>
                        <!--cart item quantity-->
                        <div class="flex w-11/12 h-1/4">
                            <button @click="decreaseQuantity(cartItem)" class="w-1/4 max-w-5 h-full  bg-primary rounded-l-md">-</button>
                            <span class=" w-1/2 h-full max-w-10  text-center bg-bg/60 flex items-center justify-center">{{
                                cartItem.quantity }}</span>
                            <button @click="increaseQuantity(cartItem)" class="w-1/4 max-w-5 h-full bg-primary rounded-r-md">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--summary-->
        <div class=" bg-bg-200 w-full rounded-lg shadow-md p-6">
            <div class="flex flex-col space-y-4 border-bg pb-2 ">
                <p class="text-xl font-bold">Podsumowanie</p>
                <hr>
                <div class="flex justify-between text-lg ">
                    <p>Wartość produktów: </p>
                    <span class="text-primary-200 font-bold"> {{ cartTotal }} zł</span>
                </div>
                <hr>
                <div class="flex justify-between text-lg ">
                    <p>Do zapłaty: </p>
                    <span class="text-primary-200 font-bold"> {{ cartTotal }} zł</span>
                </div>

                <router-link :to="{ name: 'ShippingAddressEditPage' }"
                    class="px-4 py-2  text-center bg-primary text-text rounded-md hover:bg-primary-200">
                    <span class="text-md">Przejdź do kasy</span>
                </router-link>
            </div>

        </div>
    </div>
    <!--Empty shoping cart-->
    <div v-else class="flex flex-col justify-center w-full p-4 bg-bg space-y-4">
        <div class="space-y-8  w-full  p-6 flex flex-col items-center justify-center">

            <!-- Ikona koszyka -->
            <div class="mx-2 mt-2">
                <div class="relative text-accent focus:outline-none bg-bg-200 p-8 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-16 h-16">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />

                    </svg>
                    <!-- Circle with number -->
                    <div
                        class="absolute top-10 right-8 animate-pulse transform translate-x-2 -translate-y-2 bg-primary text-text text-md p-3 rounded-full w-4 h-4 flex items-center justify-center">
                        <span>0</span>
                    </div>
                </div>
            </div>

            <p class="text-text text-xl font-semibold">Twój koszyk jest aktualnie pusty</p>
            <button @click="$router.go(-1)"
                class="px-4 py-2  text-center bg-primary text-text rounded-md hover:bg-primary-200">
                <span class="text-md">Wróć do zakupów</span>
            </button>
        </div>

    </div>
</template>
  
<script>
export default {
    computed: {
        cartItems() {

            return this.$store.state.shoppingCart.cartItems;
        },
        cartTotal() {
            return Number(this.$store.state.shoppingCart.cartTotal).toFixed(2);
        }
    },
    created() {
        this.$store.dispatch('shoppingCart/fetchCartItems');

    },
    methods: {
        async removeCartItem(id) {
            await this.$store.dispatch('shoppingCart/removeCartItem', id);
            this.$store.dispatch('shoppingCart/fetchCartItems');
        },
        async increaseQuantity(cartItem) {
            cartItem.quantity++;
            await this.$store.dispatch('shoppingCart/updateCartItem', cartItem);
            this.$store.dispatch('shoppingCart/fetchCartItems');
        },
        async decreaseQuantity(cartItem) {
            if (cartItem.quantity === 1) {
                return;
            }
            cartItem.quantity--;
            await this.$store.dispatch('shoppingCart/updateCartItem', cartItem);
            this.$store.dispatch('shoppingCart/fetchCartItems');
        },
    }
}
</script>
  
<style></style>
  