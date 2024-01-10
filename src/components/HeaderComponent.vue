<template>
  <div class="sticky top-0 w-full z-50">
    <div class="bg-bg-200 w-full  h-20 flex items-center justify-between shadow-md p-4">
      <!-- Logo -->
      <router-link to="/" @click="fetchBooks">
        <img class="mx-auto" src="/images/logo-icon.png" alt="logo" />
      </router-link>


      <SearchBar class="grow " />

      <!-- Ikona osoby -->
      <div class="mr-2 mt-2">
        <button @click="toggleUserPanel" class="text-accent focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </button>
      </div>


      <!-- Ikona koszyka -->
      <router-link :to="{ name: 'ShoppingCartPage' }">
        <div class="mx-2 mt-2">
          <button class="text-accent focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </button>
        </div>
      </router-link>
    </div>


    <!-- Panel użytkownika -->
    <transition name="slide-down">
      <div v-if="showUserPanel" class="fixed top-20 right-0 bg-bg-300 shadow-md p-4 w-48 overflow-hidden">
        <div v-if="!isLoggedIn">
          <RouterLink :to="'/login'">
            <button @click="toggleUserPanel"
              class="w-full bg-primary py-2 text-center hover:bg-primary-200">Zaloguj</button>
          </RouterLink>
          <RouterLink :to="'/register'">
            <button @click="toggleUserPanel"
              class="w-full bg-accent-200 py-2 text-center my-2 hover:bg-accent">Zarejestruj</button>
          </RouterLink>
        </div>
        <ul class="text-md text-center">
          <li>
            <router-link @click="toggleUserPanel" to="/" class="block py-2 px-4 text-text hover:text-primary-200">Twoje
              konto</router-link>
          </li>
          <li>
            <router-link @click="toggleUserPanel" to="/"
              class="block py-2 px-4 text-text hover:text-primary-200">Zamówienia</router-link>
          </li>
          <li>
            <router-link @click="toggleUserPanel" to="/profile"
              class="block py-2 px-4 text-text hover:text-primary-200">Twoje dane</router-link>
          </li>
          <li>
            <button v-if="isLoggedIn" @click="logout"
              class="w-full bg-accent-200 text-text py-2 px-4 mt-2 hover:bg-accent-300">
              Wyloguj się
            </button>
          </li>
        </ul>
      </div>
    </transition>

  </div>
</template>
  
<script>
import SearchBar from '@/components/SearchBar';

export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },
  data() {
    return {
      showUserPanel: false
    };
  },
  methods: {
    fetchBooks() {
      this.$store.dispatch('fetchBooks');
    },
    toggleUserPanel() {
      this.showUserPanel = !this.showUserPanel;
    },
    logout() {
      this.$store.dispatch('logout');

    }
  },
  components: {
    SearchBar,
  },
};
</script>
  
<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: height 0.2s linear;
}

.slide-down-enter-from {
  height: 0px;
}

.slide-down-enter-to {
  height: 200px;
}

.slide-down-leave-from {
  height: 200px;
}

.slide-down-leave-to {
  height: 0px;
}</style>