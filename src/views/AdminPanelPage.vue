<template>
    <div class=" mx-4 py-4 bg-bg h-full">
        <div class=" flex items-center justify-center  w-full h-full space-y-4">
            <div class="flex flex-wrap space-y-4 max-w-md ">
                <div class="w-full flex space-x-4">
                    <router-link :to="{ name: 'ManageBooksPage' }"
                        class="flex text-lg justify-center items-center aspect-square w-1/2 text-center  bg-bg-200 shadow-md p-4">
                        Zarządzaj książkami
                    </router-link>

                    <router-link :to="{ name: 'ManageAuthorsPage' }"
                        class="flex text-lg justify-center items-center aspect-square w-1/2 text-center  bg-bg-200 shadow-md p-4">
                        Zarządzaj autorami
                    </router-link>
                </div>
                <div class="w-full flex space-x-4">
                    <router-link :to="{ name: 'ManageCategoriesPage' }"
                        class="flex text-lg justify-center items-center aspect-square w-1/2 text-center  bg-bg-200 shadow-md  p-4">
                        Zarządzaj kategoriami
                    </router-link>

                    <router-link :to="{ name: 'ManageOrdersPage' }"
                        class="flex text-lg justify-center items-center aspect-square w-1/2 text-center  bg-bg-200 shadow-md p-4">
                        Zarządzaj zamówieniami
                    </router-link>
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
