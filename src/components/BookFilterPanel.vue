<template>
    <button @click="toggleFilterSection"
        class="sm:hidden w-full text-2xl bg-primary text-white font-bold my-2 py-2 px-4 rounded">
        {{ showFilterSection ? 'Ukryj filtry' : 'Pokaż filtry' }}
    </button>
    <div class=" overflow-hidden "
        :style="{ maxHeight: showFilterSection ? '200px' : '0px', transition: 'max-height 0.5s ease-in-out' }">
        <div class="mb-2 w-full ">
            <button @click="toggleCategorySection" class=" w-full text-white focus:outline-none flex justify-between ">
                <span>Kategoria</span>
                <span v-html="showCategorySection ? '&#8744;' : '&#8743;'" class="ml-auto"></span>
            </button>
            <div class=" overflow-hidden "
                :style="{ maxHeight: showCategorySection ? '100px' : '0px', transition: 'max-height 0.5s' }">
                <ul>
                    <li v-for="category in categories" :key="category.id">
                        <button @click="selectCategory(category)"
                            class="w-full text-sm text-left text-text-200 text-sm focus:outline-none flex justify-between hover:text-primary-200 focus:text-primary-200">
                            <span class="truncate">{{ category.name }}</span>
                            <span class="ml-auto ml-5">{{ category.count }}</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="mb-2">
            <button @click="toggleAuthorSection" class="w-full text-white focus:outline-none flex justify-between">
                <span>Autorzy</span>
                <span v-html="showAuthorSection ? '&#8744;' : '&#8743;'" class="ml-auto"></span>
            </button>
            <div class=" overflow-hidden "
                :style="{ maxHeight: showAuthorSection ? '100px' : '0px', transition: 'max-height 0.5s' }">
                <ul>
                    <li v-for="author in authors" :key="author.id">
                        <button @click="selectAuthor(author)"
                            class="w-full text-sm text-left text-text-200 text-sm focus:outline-none flex justify-between hover:text-primary-200">
                            <span class="truncate">{{ author.name }}</span>
                            <span class="ml-auto ml-5">{{ author.count }}</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            showFilterSection: false,
            showAuthorSection: false,
            showCategorySection: false
        };
    },
    mounted() {
        this.fetchAuthors();
        this.fetchCategories();
    },
    computed: {
        categories() {
            return this.$store.state.categories;
        },
        authors() {
            return this.$store.state.authors;
        },
    },

    methods: {
        toggleFilterSection() {
            this.showFilterSection = !this.showFilterSection;
        },
        toggleCategorySection() {
            this.showCategorySection = !this.showCategorySection;
        },
        toggleAuthorSection() {
            this.showAuthorSection = !this.showAuthorSection;
        },
        async selectCategory(category) {
            this.$store.dispatch('fetchBooksByCategory', category);
        },
        async selectAuthor(author) {
            this.$store.dispatch('fetchBooksByAuthor', author);
        },
        async fetchCategories() {
            this.$store.dispatch('fetchCategories');
        },
        async fetchAuthors() {
            this.$store.dispatch('fetchAuthors');
        }
    },
};
</script>
  
<style scoped></style>