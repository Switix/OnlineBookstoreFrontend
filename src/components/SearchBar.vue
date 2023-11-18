<template>
    <div class="mx-6 search-bar relative  sm:w-1/2 lg:w-1/3">

        <input v-model="searchQuery" @input="debouncedUpdateSearch" type="text" placeholder="Szukaj książki..."
            class="p-2 border border-[#75aaff] focus:outline-none rounded w-full bg-bg" />

        <div v-if="showSuggestions" class="absolute z-10 mt-1 bg-bg-200 border rounded shadow-lg flex flex-col">
            <!-- Nagłówek dla sugestii autorów -->
            <div v-if="suggestedAuthors.length" class="font-bold p-2 ">Sugerowani Autorzy:</div>
            <!-- Sugestie dla autorów -->
            <ul v-if="suggestedAuthors.length">
                <li v-for="author in suggestedAuthors" :key="author.name" @click="selectSuggestion(author, 'author')"
                    class="p-2 cursor-pointer ">{{ author.name }}</li>
            </ul>

            <!-- Nagłówek dla sugestii kategorii -->
            <div v-if="suggestedCategories.length" class="font-bold p-2">Sugerowane Kategorie:</div>
            <!-- Sugestie dla kategorii -->
            <ul v-if="suggestedCategories.length">
                <li v-for="category in suggestedCategories" :key="category.name"
                    @click="selectSuggestion(category, 'category')" class="p-2 cursor-pointer">{{ category.name }}</li>
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
            showSuggestions: false,
            suggestedAuthors: [],
            suggestedCategories: []
        };
    },
    methods: {
        debouncedUpdateSearch: _.debounce(function () {
            this.updateSearch();
        }, 300),

        async updateSearch() {
            console.log('Wyszukiwanie:', this.searchQuery);
            try {
                const response = await this.$axios.get('http://localhost:8080/api/search', { params: { q: this.searchQuery } });
                this.suggestedAuthors = response.data.suggestedAuthors;
                this.suggestedCategories = response.data.suggestedCategories;
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
            this.showSuggestions = this.searchQuery.length > 0;
        },

        selectSuggestion(selected, type) {
            var id = selected.id;
            this.$emit('selected', { id, type });
            this.showSuggestions = false;
        }
    }
};
</script>
  
<style scoped></style>