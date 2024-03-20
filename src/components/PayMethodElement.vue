<template>
    <div class="flex items-center  bg-bg/30 rounded p-2 border-2 border-transparent">
            <!-- obrazek płatnosci -->
            <div class="mr-4  text-accent focus:outline-none">
                <img :src="img" alt="pay method image"  class=" max-h-10 w-full max-w-20">
            </div>
            <div>
                <p class="text-xl">{{ name }}</p>
            </div>
        </div>
</template>
<script>
export default {
    props: {
        img: String,
        name:String
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        }
    },
};
</script>