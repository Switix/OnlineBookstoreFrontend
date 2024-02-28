<template>
    <div v-if="selectedBook" class="flex flex-col items-center justify-center p-4">
        <div class="border border-[#8f001a] bg-bg-200 w-full rounded-lg p-2 ">

            <!-- Zdjęcie książki -->
            <img class="w-52 rounded-lg shadow mx-auto my-4 cursor-pointer" :src="selectedBook.img"
                :alt="selectedBook.title" @click="toggleImageExpansion" />
            <!-- Powiększony obrazek -->
            <div v-if="isExpanded" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                @click="toggleImageExpansion">
                <div class="absolute top-4 right-4">
                    <button @click="toggleImageExpansion" @click.stop class="text-text text-2xl">&times;</button>
                </div>
                <img :src="selectedBook.img" :alt="selectedBook.title" class="max-w-full max-h-full" />
            </div>
        </div>
        <!-- Informacje o książce -->
        <div class="mt-4 p-4 bg-bg-200 w-full rounded-lg shadow">
            <h1 class="text-2xl font-bold mb-2">{{ selectedBook.title }}</h1>
            <p class="text-lg text-text mb-2">{{ selectedBook.bookAuthors.map(author => author.name).join(', ') }}</p>
            <p class="text-lg text-text mb-2">Rok wydania: {{ selectedBook.publicationYear }}</p>

            <div class="mt-4 flex items-center justify-between">
                <p class="text-xl text-primary-300">{{ selectedBook.price.toFixed(2) }} zł</p>
                <button @click="addToCart"
                    class="px-4 py-2 bg-gradient-to-r from-[#3A7BD5] from-70% to-[#4e88d9] text-text rounded-md">
                    Dodaj do koszyka
                </button>
            </div>
        </div>
        <!-- Cart Modal -->
        <div v-if="showConfirmation" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            @click="closeCartModal">
            <div class="bg-bg p-2 mx-4 rounded-md shadow-md relative w-full" @click.stop>
                <div class="m-2 flex flex-row items-center justify-between w-full">
                    <p class="text-md">Produkt został dodany do koszyka!</p>
                    <!-- Ikona X w prawym górnym rogu -->
                    <button @click="closeCartModal" class="mr-4 bg-accent/10  rounded-full">
                        <svg class="w-5 h-5 text-accent cursor-pointer m-1" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                            </path>
                        </svg>
                    </button>
                </div>
                    <hr class="border-[#8f001a]">
                <div class="mt-4 mx-2 flex flex-col md:flex-row items-center md:items-start md:justify-between">
                    <!-- Obrazek, tytuł, autorzy i cena -->
                    <div class="flex w-full items-center ">
                        <!-- Obrazek książki -->
                        <img class="w-32  rounded-md mr-6" :src="selectedBook.img" :alt="selectedBook.title" />
                        <!-- Tytuł, autorzy i cena -->
                        <div>
                            <p class="text-xl">{{ selectedBook.title }}</p>
                            <p class="text-text-200 text-md">{{ selectedBook.bookAuthors.map(author => author.name).join(', ') }}</p>
                            <p class="text-primary-200 font-semibold text-lg">{{ selectedBook.price }} zł</p>
                        </div>
                    </div>
                    <!-- Przyciski -->
                    <div class="flex flex-col mt-4 md:flex-row items-center md:justify-between w-full">
                        <!-- Przejdź do koszyka -->
                        <router-link :to="{ name: 'ShoppingCartPage' }"  class="px-4 py-2 bg-gradient-to-r from-[#3A7BD5] from-70% to-[#4e88d9] text-text text-center text-lg w-full rounded-md mb-2 md:mb-0">
                            Przejdź do koszyka
                        </router-link>
                 
                        <!-- Kontynuuj zakupy -->
                        <button @click="closeCartModal"
                            class="px-4 py-2 border border-[#3f434c] text-text text-lg w-full rounded-md">
                            Kontynuuj zakupy
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Opis ksiązki-->
        <div class="mt-4 p-4 w-full bg-bg-200 rounded-lg shadow">
            <p class="text-lg font-semibold text-text mb-2">Opis:</p>
            <p class="text-base text-text">{{ selectedBook.description }}</p>
        </div>
        <!-- Sekcja ze szczegółami -->
        <div class="mt-4 p-4 bg-bg-200 rounded-lg shadow w-full">
            <h2 class="text-xl font-semibold mb-2">Szczegóły</h2>
            <ul class="list-none p-0">
                <li class="flex mb-2">
                    <span class="w-24 inline-block">Tytuł: </span>
                    <span class="flex-1 ml-4">{{ selectedBook.title }}</span>
                </li>
                <li class="flex mb-2">
                    <span class="w-24 inline-block">Autor: </span>
                    <span class="flex-1 ml-4">{{ selectedBook.bookAuthors.map(author => author.name).join(', ')
                    }}</span>
                </li>
                <li class="flex mb-2">
                    <span class="w-24 inline-block">Kategoria: </span>
                    <span class="flex-1 ml-4">{{ selectedBook.category.name }}</span>
                </li>
                <li class="flex mb-2">
                    <span class="w-24 inline-block">Rok wydania: </span>
                    <span class="flex-1 ml-4">{{ selectedBook.publicationYear }}</span>
                </li>
                <li class="flex mb-2">
                    <span class="w-24 inline-block">ISBN: </span>
                    <span class="flex-1 ml-4">{{ selectedBook.isbn }}</span>
                </li>
                <li class="flex mb-2">
                    <span class="w-24 inline-block">Dostępność: </span>
                    <span class="flex-1 ml-4">{{ selectedBook.inventory.quantity }} sztuk</span>
                </li>
            </ul>
        </div>
        <!-- Panel z książkami od tego samego autora -->
        <div class="mt-4 w-full ">
            <h3 class="text-lg font-semibold mb-2">Inne książki autorstwa {{ selectedBook.bookAuthors[0].name }}</h3>
            <div class="bg-bg-200 rounded-lg p-4 shadow-md overflow-x-auto flex flex-row space-x-4">

                <div v-for="similarAuthorBook in similarAuthorBooks" :key="similarAuthorBook.id"
                    class=" flex-none w-32 mb-2">
                    <RouterLink :to="'/book/' + similarAuthorBook.id" @click="scrollToTop">
                        <div class="bg-bg rounded-lg overflow-hidden flex flex-col h-full">
                            <!-- Zdjęcie książki -->
                            <div>
                                <img class="object-cover mx-auto" :src="similarAuthorBook.img"
                                    :alt="similarAuthorBook.title" />
                            </div>
                            <div class="p-2 text-center flex flex-col justify-around">
                                <!-- Tytuł książki -->
                                <h2 class="text-lg mb-2 line-clamp-2">{{ similarAuthorBook.title }}</h2>
                                <!-- Autorzy książki -->
                                <p class="text-text-200 line-clamp-2 text-sm mb-2">{{
                                    similarAuthorBook.bookAuthors.map(author =>
                                        author.name).join(', ') }}</p>
                                <!-- Cena książki -->
                                <p class="text-xl mb-2 text-primary-200 font-semibold">{{ similarAuthorBook.price }} zł
                                </p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
        <!-- Panel z książkami w podobnej kategorii -->
        <div class="mt-4 w-full ">
            <h3 class="text-lg font-semibold mb-2">Książki w podobnej kategorii</h3>
            <div class="bg-bg-200 rounded-lg p-4 shadow-md overflow-x-auto flex flex-row space-x-4">
                <div v-for="similarCategoryBook in similarCategoryBooks" :key="similarCategoryBook.id"
                    class=" flex-none w-32 mb-2">
                    <RouterLink :to="'/book/' + similarCategoryBook.id" @click="scrollToTop">
                        <div class="bg-bg rounded-lg overflow-hidden flex flex-col h-full">
                            <!-- Zdjęcie książki -->
                            <div>
                                <img class="object-cover mx-auto" :src="similarCategoryBook.img"
                                    :alt="similarCategoryBook.title" />
                            </div>
                            <div class="p-2 text-center flex flex-col justify-around">
                                <!-- Tytuł książki -->
                                <h2 class="text-lg mb-2 line-clamp-2">{{ similarCategoryBook.title }}</h2>
                                <!-- Autorzy książki -->
                                <p class="text-text-200 line-clamp-2 text-sm mb-2">{{
                                    similarCategoryBook.bookAuthors.map(author =>
                                        author.name).join(', ') }}</p>
                                <!-- Cena książki -->
                                <p class="text-xl mb-2 text-primary-200 font-semibold">{{ similarCategoryBook.price }}
                                    zł
                                </p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    watch: {
        '$route.params.id': {
            immediate: true,
            handler(newId, oldId) {
                if (newId !== oldId) {
                    this.$store.dispatch('book/fetchBookAndSimilar', newId);
                }
            },
        },
    },

    data() {
        return {
            showConfirmation: false,
            isExpanded: false
        }
    },
    computed: {
        selectedBook() {
            return this.$store.state.book.selectedBook;
        },
        similarCategoryBooks() {
            return this.$store.getters['book/similarCategoryBooks'];
        },
        similarAuthorBooks() {
            return this.$store.getters['book/similarAuthorBooks'];
        }
    },
    methods: {
        toggleImageExpansion() {
            this.isExpanded = !this.isExpanded;
        },
        async addToCart() {
            const cartItem ={
                bookId: this.selectedBook.id,
                quantity: 1
            }
            await this.$store.dispatch('shoppingCart/addCartItem',cartItem);
            this.showConfirmation = true;
        },
        closeCartModal() {        
                this.showConfirmation = false;   
        },
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
    }
};
</script>
  
<style></style>
  