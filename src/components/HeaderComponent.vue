<template>
  <div class="relative">
    <!-- Header z burger menu -->
    <div class="bg-bg-200 w-full sticky top-0 flex items-center justify-between shadow-md p-4">
      <!-- Pozostała zawartość nagłówka -->
      <div>
        <img class="mx-auto" src="/images/logo-icon.png" :alt="logo" />
      </div>
      <SearchBar class="grow " />

      <!-- Ikona osoby -->
      <div class="mr-2 mt-2">
        <button @click="openUserData" class="text-accent focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </button>
      </div>

      <!-- Ikona koszyka -->
      <div class="mx-2 mt-2">
        <button @click="openCart" class="text-accent focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </button>

      </div>
    </div>
  </div>
</template>
  
<script>
import SearchBar from '@/components/SearchBar';

export default {
  components: {
    SearchBar, // Zarejestruj komponent SearchBar
  },
  data() {
    return {
      showMenu: false // Stan flyout menu
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;// Przełącz stan flyout menu
    },
    closeMenu() {
      this.showMenu = false;

    },
    openCart() {

    },
    openUserData() {

    }
  },
};
</script>
  
<style scoped>
.slide-enter-active {
  transition: transform 0.5s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-enter-to {
  transform: translateX(0);
}

.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-leave-from {
  transform: translateX(0);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>