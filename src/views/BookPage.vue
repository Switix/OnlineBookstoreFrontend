<template>
    <div v-if="book" class="flex flex-col items-center justify-center p-4">
        <div class="border border-[#8f001a] bg-bg-200 w-full rounded-lg p-2 ">
            <!-- Zdjęcie książki -->
            <img class="w-52 rounded-lg shadow mx-auto my-4" src="/images/cover.jpg" :alt="book.title" />
        </div>
        <!-- Informacje o książce -->
        <div class="mt-4 p-4 bg-bg-200 w-full rounded-lg shadow">
            <h1 class="text-2xl font-bold mb-2">{{ book.title }}</h1>
            <p class="text-lg text-text mb-2">{{ book.bookAuthors.map(author => author.name).join(', ') }}</p>
            <p class="text-lg text-text mb-2">Rok wydania: {{ book.year }}</p>

            <div class="mt-4 flex items-center justify-between">
                <p class="text-xl text-primary-300">{{ book.price }} zł</p>
                <button @click="addToCart"
                    class="px-4 py-2 bg-gradient-to-r from-[#3A7BD5] to-[#4e88d9] text-text rounded-md">
                    Dodaj do koszyka
                </button>
            </div>
        </div>
        <!-- Opis ksiązki-->
        <div class="mt-4 p-4 w-full bg-bg-200 rounded-lg shadow">
            <p class="text-lg font-semibold text-text mb-2">Opis:</p>
            <p class="text-base text-text">{{ book.description }}</p>
        </div>
        <!-- Sekcja ze szczegółami -->
        <div class="mt-4 p-4 bg-bg-200 rounded-lg shadow w-full">
            <h2 class="text-xl font-semibold mb-2">Szczegóły</h2>
            <ul class="list-none p-0">
                <li class="flex mb-2">
                    <span class="w-24 inline-block">Tytuł: </span>
                    <span>{{ book.title }}</span>
                </li>
                <li class="flex mb-2">
                    <span class="w-24 inline-block">Autor: </span>
                    <span class="flex-1">{{ book.bookAuthors.map(author => author.name).join(', ') }}</span>
                </li>
                <li class="flex mb-2">
                    <span class="w-24 inline-block">Kategoria: </span>
                    <span class="flex-1">{{ book.category.name }}</span>
                </li>
                <li class="flex mb-2">
                    <span class="w-24 inline-block">Wydawca: </span>
                    <span class="flex-1">{{ book.publisher }}</span>
                </li>
                <li class="flex mb-2">
                    <span class="w-24 inline-block">Rok wydania: </span>
                    <span class="flex-1">{{ book.date }}</span>
                </li>
                <li class="flex mb-2">
                    <span class="w-24 inline-block">ISBN: </span>
                    <span class="flex-1">{{ book.isbn }}</span>
                </li>
            </ul>
        </div>
         <!-- Panel z książkami od tego samego autora -->
         <div class="mt-4 w-full ">
            <h3 class="text-lg font-semibold mb-2">Inne książki autorstwa {{book.bookAuthors[0].name}}</h3>
            <div class="bg-bg-200 rounded-lg p-4 shadow-md overflow-x-auto flex flex-row space-x-4">

                <div v-for="similarAuthorBook in similarAuthorBooks" :key="similarAuthorBook.id"
                    class=" flex-none w-32 mb-2">
                    <RouterLink :to="'/book/' + similarAuthorBook.id" @click="scrollToTop">
                        <div class="bg-bg rounded-lg overflow-hidden flex flex-col h-full">
                            <!-- Zdjęcie książki -->
                            <div>
                                <img class="object-cover mx-auto" src="/images/cover.jpg"
                                    :alt="similarAuthorBook.title" />
                            </div>
                            <div class="p-2 text-center flex flex-col justify-around">
                                <!-- Tytuł książki -->
                                <h2 class="text-lg mb-2 line-clamp-2">{{ similarAuthorBook.title }}</h2>
                                <!-- Autorzy książki -->
                                <p class="text-text-200 line-clamp-2 text-sm mb-2">{{
                                    similarAuthorBook.bookAuthors.map(author =>
                                        author.name).join(',') }}</p>
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
                                <img class="object-cover mx-auto" src="/images/cover.jpg"
                                    :alt="similarCategoryBook.title" />
                            </div>
                            <div class="p-2 text-center flex flex-col justify-around">
                                <!-- Tytuł książki -->
                                <h2 class="text-lg mb-2 line-clamp-2">{{ similarCategoryBook.title }}</h2>
                                <!-- Autorzy książki -->
                                <p class="text-text-200 line-clamp-2 text-sm mb-2">{{
                                    similarCategoryBook.bookAuthors.map(author =>
                                        author.name).join(',') }}</p>
                                <!-- Cena książki -->
                                <p class="text-xl mb-2 text-primary-200 font-semibold">{{ similarCategoryBook.price }} zł
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
                    this.$store.dispatch('fetchBookAndSimilar', newId);
                }
            },
        },
    },

    computed: {
        book() {
            return this.$store.state.selectedBook;
        },
        similarCategoryBooks() {
            return this.$store.getters.similarCategoryBooks;
        },
        similarAuthorBooks() {
            return this.$store.getters.similarAuthorBooks;
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
    }
};
</script>
  
<style></style>
  