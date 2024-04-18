<template>
    <div class="flex items-center justify-center mx-4 py-4 bg-bg">
        <div class="max-w-md w-full space-y-4  flex flex-col">
            <div class=" bg-bg-200 rounded-lg shadow-md p-6">
                <div class="flex space-x-2">

                    <input v-model="authorSearchQuery" @input="debouncedAuthorSearch" type="text"
                        placeholder="Szukaj\dodaj autora"
                        class="p-2 border border-primary-200 focus:border-primary focus:outline-none rounded w-full bg-bg" />
                    <button @click="addAuthor" class="px-4 py-2  text-center bg-primary text-text rounded-md ">
                        <span class="text-md ">Dodaj </span>
                    </button>

                </div>
                <p class="text-accent !-mt-0">{{ searchedAuthorError }}</p>
            </div>

            <div class=" bg-bg-200 rounded-lg shadow-md p-4 space-y-2">
                <p v-if="!searchedAuthorError" class="text-lg ">Znalezieni autorzy</p>
                <div class=" bg-bg rounded-lg shadow-md p-4 relative" v-for="author in suggestedAuthors"
                    :key="author.id">

                    <p class="text-lg">Id autora: <span class="text-primary-200">{{ author.id }}</span></p>
                    <div class="flex justify-between">
                        <input v-model="author.name"
                            class=" w-2/3 p-2 border border-primary-200 focus:border-primary focus:outline-none rounded  bg-bg" />
                        <button @click="updateAuthor(author.id, author.name)"
                            class=" px-4 py-2  text-center bg-primary text-text rounded-md ">
                            <span class="text-md ">Zapisz </span>
                        </button>
                    </div>
                    <button @click="showRemoveAuthorModal(author)"
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
        <div v-if="removeAuthorModal" class="fixed z-10 inset-0 overflow-y-auto ">
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
                                    Czy na pewno chcesz usunąć tego autora?
                                   <span class="text-accent"> Usunie go to też również ze wszystkich książek.</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div class="bg-bg-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button @click="removeAuthor" type="button"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-accent-200 text-base font-medium sm:ml-3 sm:w-auto sm:text-sm">
                            Tak
                        </button>
                        <button @click="removeAuthorModal = false; " type="button"
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
            authorSearchQuery: '',
            removeAuthorModal: false,
            authorToRemove: '',
        };
    },
    computed: {

        suggestedAuthors() {
            return this.$store.state.admin.suggestedAuthors;
        },
        searchedAuthorError() {
            if (this.authorSearchQuery.length < 2 || this.suggestedAuthors.length > 0) {
                return "";
            }
            return "Nie znaleziono autora o takiej nazwie";
        },
    },
    methods: {
        debouncedAuthorSearch: _.debounce(function () {
            if (this.authorSearchQuery.length < 2) {
                this.$store.dispatch('admin/clearAuthorSearch');
                return;
            }
            this.$store.dispatch('admin/searchAuthorByName', this.authorSearchQuery);
        }, 300),
        updateAuthor(id, name) {
            const updateDate = {
                id: id,
                name: name
            }
            this.$store.dispatch('admin/updateAuthor', updateDate);
        },
        showRemoveAuthorModal(author){
            this.authorToRemove = author;
            this.removeAuthorModal = true;
        },
        removeAuthor() {
            this.$store.dispatch('admin/removeAuthor', this.authorToRemove.id);
            this.authorToRemove = '';
            this.removeAuthorModal = false;
        },
        addAuthor(){
            const authorData={
                name: this.authorSearchQuery
            }
            this.$store.dispatch('admin/addAuthor', authorData);
        }
    },
    created() {

    },
    mounted(){
    }
};
</script>
