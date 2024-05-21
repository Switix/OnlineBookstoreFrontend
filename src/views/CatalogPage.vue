<template>
  <div class="container mx-auto p-4 ">
    <div class="container mx-auto block sm:flex justify-around  ">
      <div class="sm:w-1/3 sm:max-w-xs px-4 py-1">
        <h1 class="text-2xl font-bold sm:my-2 text-white bg-bg-200 rounded-lg shadow-md p-4">{{ catalogTitle }}</h1>
        <BookFilterPanel />
      </div>
      <div class="p-1 w-full sm:w-2/3">
        <div class="flex flex-wrap justify-center  xl:justify-start -mx-4">
          <div v-for="book in books" :key="book.id" class="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2 max-w-56    ">
            <RouterLink :to="'/book/' + book.id" >
              <div class="bg-bg-200 rounded-lg overflow-hidden flex flex-col h-[26rem] xl:h-[32rem]   ">
                <!-- Zdjęcie książki -->        
                  <img class="object-fill h-3/5 mx-auto  w-full " :src="book.img" :alt="book.title" />             
                <div class="p-2 h-2/5 text-center flex flex-col justify-around">
                  <!-- Tytuł książki -->
                  <h2 class="text-lg mb-2 line-clamp-2">{{ book.title }}</h2>
                  <!-- Autorzy książki -->
                  <p class="text-text-200 line-clamp-2 text-sm mb-2">{{ book.bookAuthors.map(author =>
                    author.name).join(',') }}</p>
                  <!-- Cena książki -->
                  <p class="text-xl mb-2 text-primary-200 font-semibold">{{ book.price }} zł</p>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookFilterPanel from '@/components/BookFilterPanel';

export default {
  created() {
    this.$store.dispatch('book/fetchBooks');
  },

  computed: {
    books() {
      return this.$store.state.book.books;
    },
    catalogTitle() {
      return this.$store.state.book.catalogTitle;
    },
  },
  components: {
    BookFilterPanel,
  }
};
</script>

<style scoped></style>
