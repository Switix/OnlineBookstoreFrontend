<template>
    <div class="flex items-center  bg-bg/30 rounded border-2 border-transparent p-2">
            <!-- obrazek płatnosci -->
            <div class="mr-4  text-accent focus:outline-none">
                <img :src="img" alt="pay method image"  class=" max-h-16 w-full max-w-16">
            </div>
            <div class="flex flex-col">
                <p class="text-xl">{{ name }}</p>
                <p class=" text-base text-primary-200">{{ Number(price).toFixed(2)}} zł</p>
            </div>
        </div>
</template>
<script>
export default {
    props: {
        img: String,
        name:String,
        price:Number
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        }
    },
};
</script>