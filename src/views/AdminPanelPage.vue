<template>
    <div class="flex items-center justify-center mx-4 py-4 bg-bg">
        <div class="max-w-md w-full space-y-4">
            <div class="flex flex-wrap space-y-4 ">
                <div class="w-full flex space-x-4">
                    <div class="flex text-lg justify-center items-center aspect-square w-1/2 text-center  bg-bg-200 shadow-md">
                        <router-link :to="{ name: 'ManageBooksPage' }">
                            Zarządzaj książkami
                        </router-link>
                    </div>
                    <div class="flex text-lg justify-center items-center aspect-square w-1/2 text-center  bg-bg-200 shadow-md">
                        <router-link :to="{ name: 'ManageAuthorsPage' }">
                            Zarządzaj autorami
                        </router-link>
                    </div>
                </div>
                <div class="w-full flex space-x-4">
                    <div class="flex text-lg justify-center items-center aspect-square w-1/2 text-center  bg-bg-200 shadow-md">
                        <router-link :to="{ name: 'ManageCategoriesPage' }">
                            Zarządzaj kategoriami
                        </router-link>
                    </div>
                    <div class="flex text-lg justify-center items-center aspect-square w-1/2 text-center  bg-bg-200 shadow-md">
                        <router-link :to="{ name: 'ManageOrdersPage' }">
                            Zarządzaj zamówieniami
                        </router-link>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>


export default {
    data() {
        return {

        };

    },
    computed: {

    },
    methods: {


    },
    created() {

    },
};
</script>
