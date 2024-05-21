<template>
    <div class=" bg-bg-200 w-full rounded-lg shadow-md p-6 ">
        <div class="flex flex-col space-y-4 border-bg  ">
            <p class="text-xl font-bold">Podsumowanie</p>
            <hr>
            <div class="flex justify-between text-lg ">
                <p>Wartość produktów: </p>
                <span class="text-primary-200 font-bold"> {{ cartTotal }} zł</span>
            </div>

            <hr v-if="shipmentPrice != null">
            <div v-if="shipmentPrice != null" class="flex justify-between text-lg ">
                <p>Koszt dostawy: </p>
                <span class="text-primary-200 font-bold"> {{ shipmentPrice.toFixed(2) }} zł</span>
            </div>

            <hr>
            <div class="flex justify-between text-lg ">
                <p>Do zapłaty: </p>
                <span class="text-primary-200 font-bold"> {{ shipmentPrice != null ? (Number(cartTotal) +
                    Number(shipmentPrice)).toFixed(2) : cartTotal }} zł
                </span>
            </div>
            <slot>

            </slot>
        </div>


    </div>
</template>
<script>
export default {
    props: {
        shipmentPrice: Number
    },
    computed: {
        cartTotal() {
            return Number(this.$store.state.shoppingCart.cartTotal).toFixed(2);
        }
    },

}
</script>
