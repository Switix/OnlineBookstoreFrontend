<template>
  <div v-if="book" class="container mx-auto p-4 max-w-lg">
    <h1 class="text-2xl font-bold mb-4">Edit Book</h1>

    <div class="border border-[#8f001a] bg-bg-200 w-full rounded-lg p-2 ">
      <!-- Zdjęcie książki -->
      <img class="w-52 rounded-lg shadow mx-auto my-4 cursor-pointer" :src="book.img" alt="zdjecie ksiazki" />
    </div>
    <input type="file" @change="handleImageChange"
      class="p-2 mt-4 border border-primary-200 focus:border-primary focus:outline-none rounded w-full bg-bg-200" />

    <div class="mt-4 p-4 bg-bg-200 rounded-lg shadow w-full">
      <ul class="list-none p-0 space-y-2">
        <li v-if="book.id">
          <span class="ml-0.5 text-lg">Id książki: </span>
          <span class="text-primary-200 text-lg">{{ book.id }}</span>
        </li>
        <li class="flex flex-col ">
          <span class=" ml-1">Tytuł </span>
          <input v-model="book.title" type="text"
            class="p-2 border border-primary-200 focus:border-primary focus:outline-none rounded w-full bg-bg" />

        </li>
        <li class="flex flex-col ">
          <span class=" ml-1">Rok wydania </span>
          <input v-model="book.publicationYear" type="number"
            class="p-2 border border-primary-200 focus:border-primary focus:outline-none rounded w-full bg-bg" />

        </li>
        <li class="flex flex-col ">
          <span class=" ml-1">ISBN </span>
          <input v-model="book.isbn" type="text"
            class="p-2 border border-primary-200 focus:border-primary focus:outline-none rounded w-full bg-bg" />
        </li>
        <li class="flex flex-col ">
          <span class=" ml-1">Opis </span>
          <textarea v-model="book.description" type="text" rows="4"
            class="p-2  border border-primary-200 focus:border-primary focus:outline-none rounded w-full bg-bg">
                  </textarea>
        </li>
        <li class="flex flex-col ">
          <span class=" ml-1">Cena </span>
          <input v-model="book.price" type="number" min="0.00" max="10000.00" step="0.01"
            class="p-2 border border-primary-200 focus:border-primary focus:outline-none rounded w-full bg-bg" />
        </li>

        <li v-if="book.inventory.id">
          <span class="ml-0.5 text-lg">Id inwentarza: </span>
          <span class="text-primary-200 text-lg">{{ book.inventory.id }}</span>
        </li>
        <li class="flex flex-col ">
          <span class=" ml-1">Dostępność szt.</span>
          <input v-model="book.inventory.quantity" type="text"
            class="p-2 border border-primary-200 focus:border-primary focus:outline-none rounded w-full bg-bg" />
        </li>
      </ul>
    </div>
    <div class="mt-4 p-4 bg-bg-200 rounded-lg shadow w-full space-y-2">
      <span class="text-xl font-bold">Kategoria</span>
      <!-- category-->
      <div v-if="!book.category.id">
        <input v-model="categorySearchQuery" @input="debouncedCategorySearch" type="text" placeholder="Szukaj kategorie"
          class="p-2 border border-primary-200 focus:border-primary focus:outline-none rounded w-full bg-bg" />
      </div>

      <div v-else class="relative flex justify-between items-center">
        <div>
          <p class="text-lg">Id kategori: <span class="text-primary-200">{{ book.category.id }}</span></p>
          <p class="font-bold text-xl">{{ book.category.name }}</p>
        </div>
        <button @click="removeCategory" type="button"
          class="px-4 py-2  text-center bg-accent-200 text-text rounded-md ">
          Usuń
        </button>
      </div>

      <p class="text-accent !-mt-0">{{ searchedCategoryError }}</p>

      <div v-if="!searchedCategoryError && categorySearchQuery.length != 0" class="  space-y-2 ">
        <p class="text-lg font-bold">Znalezione kategorie</p>
        <div class=" bg-bg rounded-lg shadow-md p-4 relative flex justify-between items-center"
          v-for="category in suggestedCategories" :key="category.id">
          <div>
            <p class="text-lg">Id kategori: <span class="text-primary-200">{{ category.id }}</span></p>
            <p class="font-bold text-xl">{{ category.name }}</p>
          </div>

          <button @click="addCategory(category)" class=" px-4 py-2  text-center bg-primary text-text rounded-md ">
            <span class="text-md ">Dodaj </span>
          </button>
        </div>
      </div>
    </div>

    <!-- author-->
    <div class="mt-4 p-4 bg-bg-200 rounded-lg shadow w-full space-y-2">
      <span class="text-xl font-bold">Autorzy</span>
      <input v-model="authorSearchQuery" @input="debouncedAuthorSearch" type="text" placeholder="Szukaj autora"
        class="p-2 border border-primary-200 focus:border-primary focus:outline-none rounded w-full bg-bg" />

      <p v-if="!searchedAuthorError && authorSearchQuery.length != 0" class="text-lg ">Znalezieni autorzy</p>
      <p v-else class="text-lg text-accent ">{{ searchedAuthorError }}</p>
      <div class=" bg-bg rounded-lg shadow-md p-4 relative flex justify-between items-center"
        v-for="author in suggestedAuthors" :key="author.id">
        <div>
          <p class="text-lg">Id autora: <span class="text-primary-200">{{ author.id }}</span></p>
          <p class="font-bold text-xl">{{ author.name }}</p>
        </div>
        <button @click="addAuthor(author)" class=" px-4 py-2  text-center bg-primary text-text rounded-md ">
          <span class="text-md ">Dodaj </span>
        </button>

      </div>
      <p v-if="book.bookAuthors.length > 0" class="text-lg ">Dodani autorzy</p>
      <p v-else class="text-lg text-accent ">Brak Dodanych autorów</p>
      <div v-for="author in book.bookAuthors" :key="author.id"
        class="bg-bg rounded-lg shadow-md p-4 relative flex justify-between items-center">
        <div>
          <p class="text-lg">Id autora: <span class="text-primary-200">{{ author.id }}</span></p>
          <p class="font-bold text-xl">{{ author.name }}</p>
        </div>
        <button @click="removeAuthor(author)" type="button"
          class="px-4 py-2  text-center bg-accent-200 text-text rounded-md ">
          Usuń
        </button>
      </div>
    </div>
    <button @click="saveBook()"
      class=" mt-4 w-full rounded-md shadow-sm px-4 py-2 bg-primary text-base font-medium  ">
      Zapisz
    </button>
    <p class="text-green-500 text-center">{{ saveStatus }}</p>
  </div>


</template>

<script>
import _ from 'lodash';
export default {
  data() {
    return {
      book: null,
      categorySearchQuery: '',
      authorSearchQuery: '',
      newImage: null,
      loaded: false
    };
  },
  computed: {

    suggestedCategories() {
      return this.$store.state.admin.suggestedCategories;
    },
    searchedCategoryError() {
      if (this.suggestedCategories.length > 0 || this.categorySearchQuery.length == 0) {
        return "";
      }
      return "Nie znaleziono kategori o takiej nazwie";
    },

    suggestedAuthors() {
      return this.$store.state.admin.suggestedAuthors
        .filter(author => !this.book.bookAuthors.some(bookAuthor => bookAuthor.id === author.id));

    },
    searchedAuthorError() {
      if (this.authorSearchQuery.length == 0 || this.suggestedAuthors.length > 0) {
        return "";
      }
      return "Nie znaleziono autora o takiej nazwie";
    },
    saveStatus() {
      return this.$store.state.admin.saveStatus;
    }
  },
  mounted() {
    this.$store.dispatch('admin/clearCategorySearch');
    this.$store.dispatch('admin/clearAuthorSearch');
    const bookToEdit = this.$store.state.admin.bookToEdit;
    if (bookToEdit.id) {
      this.book = bookToEdit;
    }
    else {
      this.book = {
        title: "",
        description: "",
        price: 0.00,
        imageUrl: "no_image_selected.jpg",
        publicationYear: 1997,
        isbn: "9780747532743",
        category: {

        },
        inventory: {
          quantity: 15
        },
        bookAuthors: [
        ],
        img: "/images/no_image_selected.jpg"

      };

    }
    this.loaded = true;
  },
  methods: {
    handleImageChange(event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          // Update the book.img with the new image URL
          this.book.img = e.target.result;
        };

        // Read the selected image file as a data URL
        reader.readAsDataURL(file);
        this.newImage = file;
      }

    },
    debouncedCategorySearch: _.debounce(function () {
      if (this.categorySearchQuery.length == 0) {
        this.$store.dispatch('admin/clearCategorySearch');
        return;
      }
      this.$store.dispatch('admin/searchCategoryByName', this.categorySearchQuery);
    }, 300),
    removeCategory() {
      this.book.category = {};
    },
    addCategory(category) {
      this.book.category = category;
      this.categorySearchQuery = '';
    },

    debouncedAuthorSearch: _.debounce(function () {
      if (this.authorSearchQuery.length == 0) {
        this.$store.dispatch('admin/clearAuthorSearch');
        return;
      }
      this.$store.dispatch('admin/searchAuthorByName', this.authorSearchQuery);
    }, 300),
    addAuthor(author) {
      this.book.bookAuthors.push(author);
    },
    removeAuthor(author) {
      this.book.bookAuthors = this.book.bookAuthors.filter(a => a !== author);
    },

    async saveBook() {

      if (this.newImage) {
        const data = {
          book: this.book,
          newImage: this.newImage
        }
        await this.$store.dispatch('admin/uploadBookImage', data);
      }

      if (this.book.id) {
        this.$store.dispatch('admin/updateBook', this.book);
      }
      else {
        this.$store.dispatch('admin/saveBook', this.book);
      }
    }
  },
  unmounted(){
    this.$store.dispatch('admin/setSaveSatus', "");
  }
}
</script>

<style></style>