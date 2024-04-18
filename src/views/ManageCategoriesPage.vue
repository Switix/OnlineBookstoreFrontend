<template>
    <div class="flex items-center justify-center mx-4 py-4 bg-bg">
        <div class="max-w-md w-full space-y-4  flex flex-col">
            <div class=" bg-bg-200 rounded-lg shadow-md p-6">
                <div class="flex space-x-2">

                    <input v-model="categorySearchQuery" @input="debouncedCategorySearch" type="text"
                        placeholder="Szukaj\dodaj kategorie"
                        class="p-2 border border-primary-200 focus:border-primary focus:outline-none rounded w-full bg-bg" />
                    <button @click="addCategory" class="px-4 py-2  text-center bg-primary text-text rounded-md ">
                        <span class="text-md ">Dodaj </span>
                    </button>

                </div>
                <p class="text-accent !-mt-0">{{ searchedCategoryError }}</p>
            </div>

            <div v-if="!searchedCategoryError" class=" bg-bg-200 rounded-lg shadow-md p-4 space-y-2">
                <p  class="text-lg ">Znalezione kategorie</p>
                <div class=" bg-bg rounded-lg shadow-md p-4 relative" v-for="category in suggestedCategories"
                    :key="category.id">

                    <p class="text-lg">Id kategori: <span class="text-primary-200">{{ category.id }}</span></p>
                    <div class="flex justify-between">
                        <input v-model="category.name"
                            class=" w-2/3 p-2 border border-primary-200 focus:border-primary focus:outline-none rounded  bg-bg" />
                        <button @click="updateCategory(category.id, category.name)"
                            class=" px-4 py-2  text-center bg-primary text-text rounded-md ">
                            <span class="text-md ">Zapisz </span>
                        </button>
                    </div>
                    <button @click="showRemoveCategoryModal(category)"
                        class="bg-accent/10 p-0.5 rounded-full absolute top-2 right-2">
                        <svg class="w-5 h-5 text-accent cursor-pointer" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12">
                            </path>
                        </svg>
                    </button>


                </div>
            </div>
        </div>
        <!--Modal-->
        <div v-if="removeCategoryModal" class="fixed z-10 inset-0 overflow-y-auto ">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <!-- Background overlay -->
                <div class="fixed inset-0 " aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500/75"></div>
                </div>

                <!-- Modal dialog -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    class="inline-block align-bottom bg-bg rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-bg px-4 p-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg leading-6 font-medium text-text">
                                    Czy na pewno chcesz usunąć tę kategorie?
                                   <span class="text-accent"> Usunie ją też ze wszystkich książek.</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div class="bg-bg-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button @click="removeCategory" type="button"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-accent-200 text-base font-medium sm:ml-3 sm:w-auto sm:text-sm">
                            Tak
                        </button>
                        <button @click="removeCategoryModal = false; " type="button"
                            class="mt-3 w-full inline-flex justify-center rounded-md  shadow-sm px-4 py-2 bg-primary text-base font-medium   sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Nie
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

import _ from 'lodash';
export default {

    data() {
        return {
            categorySearchQuery: '',
            removeCategoryModal: false,
            categoryToRemove: '',
        };
    },
    computed: {

        suggestedCategories() {
            return this.$store.state.admin.suggestedCategories;
        },
        searchedCategoryError() {
            if (this.categorySearchQuery.length < 2 || this.suggestedCategories.length > 0) {
                return "";
            }
            return "Nie znaleziono kategori o takiej nazwie";
        },
    },
    methods: {
        debouncedCategorySearch: _.debounce(function () {
            if (this.categorySearchQuery.length < 2) {
                this.$store.dispatch('admin/clearCategorySearch');
                return;
            }
            this.$store.dispatch('admin/searchCategoryByName', this.categorySearchQuery);
        }, 300),
        updateCategory(id, name) {
            const updateDate = {
                id: id,
                name: name
            }
            this.$store.dispatch('admin/updateCategory', updateDate);
        },
        showRemoveCategoryModal(category){
            this.categoryToRemove = category;
            this.removeCategoryModal = true;
        },
        removeCategory() {
            this.$store.dispatch('admin/removeCategory', this.categoryToRemove.id);
            this.categoryToRemove = '';
            this.removeCategoryModal = false;
        },
        addCategory(){
            const categoryData={
                name: this.categorySearchQuery
            }
            this.$store.dispatch('admin/addCategory', categoryData);
        }
    },
    created() {

    },
    mounted(){
    }
};
</script>
