<template>
    <button @click="toggleFilterSection"
        class="sm:hidden w-full text-2xl bg-primary text-white font-bold my-2 py-2 px-4 rounded">
        {{ showFilterSection ? 'Ukryj filtry' : 'Pokaż filtry' }}
    </button>
    <div class=" overflow-hidden bg-bg-200 rounded-lg shadow-md space-y-2 px-4  "
        :class="[showFilterSection ? 'py-4' : 'py-0']"
        :style="{ height: filterSectionHeight, transition: 'height 0.4s ease-in-out ,padding 0.4s ease-in-out' }">
        <div class="mb-2 w-full ">
            <button @click="toggleCategorySection" class=" w-full text-white focus:outline-none flex justify-between ">
                <span class="text-2xl font-bold "
                    :class="[showCategorySection ? 'text-primary-200' : 'text-text']">Kategoria</span>
                <span v-html="showCategorySection ? '&#8744;' : '&#8743;'" class="ml-auto"></span>
            </button>
            <div class="  overflow-hidden"
                :style="{ height: categorySectionHeight, transition: 'height 0.4s ease-in-out ' }">
                <ul>
                    <li v-for="category in categories" :key="category.id">
                        <button @click="selectCategory(category)"
                            class="w-full text-left text-text focus:outline-none flex justify-between hover:text-primary-200 focus:text-primary-200">
                            <span class="truncate">{{ category.name }}</span>
                            <span class="ml-auto">{{ category.count }}</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="mb-2">
            <button @click="toggleAuthorSection" class="w-full text-white focus:outline-none flex justify-between">
                <span class="text-2xl font-bold text-primary-200"
                    :class="[showAuthorSection ? 'text-primary-200' : 'text-text']">Autorzy</span>
                <span v-html="showAuthorSection ? '&#8744;' : '&#8743;'" class="ml-auto"></span>
            </button>
            <div class=" overflow-hidden "
                :style="{ height: authorSectionHeight, transition: 'height 0.4s ease-in-out ' }">
                <ul>
                    <li v-for="author in authors" :key="author.id">
                        <button @click="selectAuthor(author)"
                            class="w-full text-left text-text-200 focus:outline-none flex justify-between hover:text-primary-200">
                            <span class="truncate">{{ author.name }}</span>
                            <span class="ml-auto">{{ author.count }}</span>
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
            showCategorySection: false,
            windowWidth: window.innerWidth,
            itemHeight: 24
        };
    },
    mounted() {
        this.fetchAuthors();
        this.fetchCategories();
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        // Remove the event listener to prevent memory leaks
        window.removeEventListener('resize', this.handleResize);
    },

    computed: {
        categories() {
            return this.$store.state.book.categories;
        },
        authors() {
            return this.$store.state.book.authors;
        },
        isOverPhoneWidth() {
            return this.windowWidth > this.$store.state.phoneWidth;
        },
        filterSectionHeight() {

            const numCategories = this.showCategorySection ? this.categories.length : 0;
            const numAuthors = this.showAuthorSection ? this.authors.length : 0;
            return this.showFilterSection ? `${this.itemHeight * (numCategories + numAuthors) + 106}px` : '0px';
        },
        authorSectionHeight() {
            const numAuthors = this.authors.length;
            return this.showAuthorSection ? `${this.itemHeight * numAuthors}px` : '0px';
        },
        categorySectionHeight() {
            const numCategories = this.categories.length;
            return this.showCategorySection ? `${this.itemHeight * numCategories}px` : '0px';
        },
    },

    methods: {
        handleResize() {
            this.windowWidth = window.innerWidth;
        },
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
            this.$store.dispatch('book/fetchBooksByCategory', category);
        },
        async selectAuthor(author) {
            this.$store.dispatch('book/fetchBooksByAuthor', author);
        },
        async fetchCategories() {
            this.$store.dispatch('book/fetchCategories');
        },
        async fetchAuthors() {
            this.$store.dispatch('book/fetchAuthors');
        }
    },
    watch: {
        isOverPhoneWidth: {

            handler(newValue) {
                if (newValue) {
                    // If not over phone width, hide the filter section
                    this.showFilterSection = true;
                    this.showAuthorSection = true;
                    this.showCategorySection = true;
                } else {
                    this.showFilterSection = false;
                    this.showAuthorSection = false;
                    this.showCategorySection = false;
                }
            },
            immediate: true // Launch the watcher immediately
        }
    }
};
</script>

<style scoped></style>