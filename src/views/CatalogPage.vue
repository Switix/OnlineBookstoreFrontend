<template>
  <HeaderComponent @selected="handleSelectedSuggestion"/>
  <div class="container mx-auto p-4">
    <div class="container mx-auto block sm:flex  ">
      <div class="sm:w-1/3 sm:max-w-xs px-4 py-1">
        <h1 class="text-2xl font-bold m-2 text-white">{{catalogTitle}}</h1>
        <BookFilterPanel @selectCategory="selectCategory" @selectAuthor="selectAuthor" />
      </div>
      <div class="p-1 w-full sm:w-2/3">
        <div class="flex flex-wrap -mx-4">

          

          <div v-for="book in books" :key="book.id" class="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2  ">
            <div class="bg-bg-200 rounded-lg overflow-hidden flex flex-col  h-full">
              <!-- Zdjęcie książki -->
              <div>
                <img class="object-cover mx-auto  " src="/images/cover.jpg" :alt="book.title" />
              </div>
              <div class="p-2 text-center flex flex-col justify-around">
                <!-- Tytuł książki -->
                <h2 class="text-lg mb-2 line-clamp-2">{{ book.title }}</h2>
                <!-- Autorzy książki -->
                <p class="text-text-200 line-clamp-2 text-sm mb-2">{{ book.bookAuthors.map(author => author.name).join(', ') }}</p>
                <!-- Cena książki -->
                <p class="text-xl mb-2 text-primary-200 font-semibold">{{ book.price }} zł</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookFilterPanel from '@/components/BookFilterPanel';
import HeaderComponent from '@/components/HeaderComponent';

export default {
  data() {
    return {
      books: [], 
      showCategorySection: false,
      showAuthorSection: false,
      catalogTitle:'Książki',
      categories: [],
      authors: []
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await this.$axios.get('http://localhost:8080/api/books');
        // Zaktualizuj wartość books danymi z odpowiedzi
        this.books = response.data;
        this.catalogTitle = 'Książki';
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    },
    async handleSelectedSuggestion(selectedInfo) {
      const { id, type } = selectedInfo;
      console.log("em cos");
      const fetchData = async (url) => {
        try {
          const response = await this.$axios.get(url + id);
          this.books = response.data;
        } catch (error) {
          console.error('Błąd podczas pobierania danych:', error);
        }
      };

      if (type === 'author') {
        console.log('Wybrano sugestię autora w katalogu:', id);
        await fetchData('http://localhost:8080/api/books/authors/');
      } else if (type === 'category') {
        console.log('Wybrano sugestię kategorii w katalogu:', id);
        await fetchData('http://localhost:8080/api/books/categories/');
      }

    },
    async selectCategory(category){
      try {
        const response = await this.$axios.get('http://localhost:8080/api/books/categories/'+category.id);
        // Zaktualizuj wartość books danymi z odpowiedzi
        this.books = response.data;
        this.catalogTitle = 'Książki w kategorii ' + category.name;
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    },
    async selectAuthor(author){
      try {
        const response = await this.$axios.get('http://localhost:8080/api/books/authors/'+author.id);
        this.books = response.data;
        this.catalogTitle = 'Książki autorstwa ' + author.name;
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    }
  },
  components: {
    BookFilterPanel,
    HeaderComponent
  }
};
</script>

<style scoped>
</style>
