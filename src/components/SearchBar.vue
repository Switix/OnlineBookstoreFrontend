<template>
    <div class="mx-6 w-1/2 relative max-w-[32rem]">

        <input v-model="searchQuery" @input="debouncedUpdateSearch" type="text" placeholder="Szukaj książki..."
            class="p-2 border border-[#75aaff] focus:outline-none rounded w-full bg-bg" />

        <div v-if="showSuggestions" class="absolute z-10 mt-1 bg-bg-200 border rounded shadow-lg flex flex-col">

            <!-- Nagłówek dla sugestii książek -->
            <div v-if="suggestedBooks.length > 0" class="font-bold p-2 ">Sugerowane Ksiażki:</div>
            <!-- Sugestie dla ksiązek -->
            <ul v-if="suggestedBooks.length > 0">
                <li v-for="book in suggestedBooks" :key="book.id" @click="selectSuggestion(book)"
                    class="p-2 cursor-pointer ">{{ book.title }}</li>
            </ul>

            <!-- Nagłówek dla sugestii autorów -->
            <div v-if="suggestedAuthors.length > 0" class="font-bold p-2 ">Sugerowani Autorzy:</div>
            <!-- Sugestie dla autorów -->
            <ul v-if="suggestedAuthors.length > 0">
                <li v-for="author in suggestedAuthors" :key="author.name" @click="selectSuggestion(author)"
                    class="p-2 cursor-pointer ">{{ author.name }}</li>
            </ul>

            <!-- Nagłówek dla sugestii kategorii -->
            <div v-if="suggestedCategories.length" class="font-bold p-2">Sugerowane Kategorie:</div>
            <!-- Sugestie dla kategorii -->
            <ul v-if="suggestedCategories.length">
                <li v-for="category in suggestedCategories" :key="category.name" @click="selectSuggestion(category)"
                    class="p-2 cursor-pointer">{{ category.name }}</li>
            </ul>
        </div>
    </div>
</template>
  
<script>
import _ from 'lodash';

export default {
    data() {
        return {
            searchQuery: '',
        };
    },
    computed: {
        suggestedAuthors() {
            return this.$store.state.book.suggestedAuthors;
        },
        suggestedBooks() {
            return this.$store.state.book.suggestedBooks;
        },
        suggestedCategories() {
            return this.$store.state.book.suggestedCategories;
        },
        showSuggestions() {
            return this.$store.state.book.showSuggestions;
        }
    },
    methods: {
        debouncedUpdateSearch: _.debounce(function () {
            this.$store.dispatch('book/suggestionSearch', this.searchQuery);
        }, 300),

        selectSuggestion(selected) {
            this.$store.dispatch('book/fetchSelectedSuggestion', selected);
        }
    }
};
</script>
  
<style scoped></style>