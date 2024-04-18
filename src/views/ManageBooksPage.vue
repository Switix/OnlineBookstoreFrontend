<template>
    <div class="flex items-center justify-center mx-4 py-4 bg-bg">
        <div class="max-w-md w-full space-y-4  flex flex-col">
            <div class=" bg-bg-200 rounded-lg shadow-md p-6">
                <button @click="editBook({})"
                    class=" w-full inline-flex justify-center rounded-md  shadow-sm px-4 py-2 bg-primary text-base font-medium   sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Dodaj nową książkę
                </button>
            </div>
            <div class=" bg-bg-200 rounded-lg shadow-md p-6">

                <input v-model="bookSearchQuery" @input="debouncedBookSearch" type="text" placeholder="Szukaj książki"
                    class="p-2 border border-primary-200 focus:border-primary focus:outline-none rounded w-full bg-bg" />

                <p class="text-accent !-mt-0">{{ searchedBookError }}</p>
            </div>

            <div v-if="!searchedBookError" class=" bg-bg-200 rounded-lg shadow-md p-4 space-y-2 ">
                <p class="text-lg ">Znalezione Książki</p>
                <div class=" bg-bg rounded-lg shadow-md p-4 relative" v-for="book in suggestedBooks" :key="book.id">


                    <div class="flex items-center bg-bg/30 rounded ">
                        <!-- obrazek książki -->
                        <img :src="book.img" alt="book image" class=" max-h-48 w-5/12 max-w-28 min-h-32 ">
                        <div class="p-2 text-center flex flex-col items-center w-full">
                            <!--Id -->
                            <p class="text-lg">Id: <span class="text-primary-200">{{ book.id }}</span></p>
                            <!-- Tytuł książki -->
                            <h2 class="text-lg font-bold mb-2 line-clamp-2 ">{{ book.title }}</h2>
                            <!-- Autorzy książki -->
                            <p class="text-md mb-2 line-clamp-2">{{ book.bookAuthors.map(author =>
                                author.name).join(',')
                                }}</p>
                        </div>
                    </div>


                    <button @click="editBook(book)" class="bg-primary/20 p-0.5 rounded-full absolute top-2 right-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="p-0.5 w-5 h-5 text-primary cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>

                    </button>

                    <button @click="showRemoveBookModal(book)"
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
        <div v-if="removeBookModal" class="fixed z-10 inset-0 overflow-y-auto ">
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
                                    Czy na pewno chcesz usunąć tę książke?
                                    <span class="text-accent"> Książka przestanie być dostępna i jej ilość wyzerowana.</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div class="bg-bg-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button @click="removeBook" type="button"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-accent-200 text-base font-medium sm:ml-3 sm:w-auto sm:text-sm">
                            Tak
                        </button>
                        <button @click="removeBookModal = false;" type="button"
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
import router from '@/router';
export default {

    data() {
        return {
            bookSearchQuery: '',
            removeBookModal: false,
            bookToRemove: '',
        };
    },
    computed: {
        suggestedBooks() {
            return this.$store.state.admin.suggestedBooks;
        },
        searchedBookError() {
            if (this.bookSearchQuery.length < 2 || this.suggestedBooks.length > 0) {
                return "";
            }
            return "Nie znaleziono książki o takiej nazwie";
        },
    },
    methods: {
        debouncedBookSearch: _.debounce(function () {
            if (this.bookSearchQuery.length < 2) {
                this.$store.dispatch('admin/clearBookSearch');
                return;
            }
            this.$store.dispatch('admin/searchBookByTitle', this.bookSearchQuery);
        }, 300),

        showRemoveBookModal(book) {
            this.bookToRemove = book;
            this.removeBookModal = true;
        },
        removeBook() {
            this.$store.dispatch('admin/removeBook', this.bookToRemove.id);
            this.bookToRemove = '';
            this.removeBookModal = false;
        },
        editBook(book) {
            this.$store.dispatch('admin/setBookToEdit', book);
            router.push({ name: 'EditBookPage' });

        }
    },
    created() {

    },
    mounted() {
    },
    unmounted(){
        this.$store.dispatch('admin/clearBookSearch');
    }
};
</script>
