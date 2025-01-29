<template>
  <div class="sticky top-0 w-full z-50 bg-[#202c44] ">
    <div class=" mx-auto container  h-20  p-4 ">
      <div class=" mx-auto  flex items-center justify-around">
      <!-- Logo -->
      <router-link to="/" @click="fetchBooks">
        <img class="mx-auto" src="/images/logo-icon.png" alt="logo" />
      </router-link>


      <SearchBar />

      <div class="flex space-x-0">
    <!-- Ikona osoby -->
    <div class="mr-2 mt-2">
      <button @click="toggleUserPanel" ref="userIconButton" class="text-accent focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
          stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      </button>
    </div>


      <!-- Ikona koszyka -->
      <router-link v-if="!isAdmin" :to="{ name: 'ShoppingCartPage' }">
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
    </div>
  </div>


   <!-- Panel użytkownika -->
  <transition name="slide-down">
    <div v-if="showUserPanel" :style="{ right: userPanelRight }" class="fixed top-20 bg-bg-300 shadow-md p-4 w-48 overflow-hidden">
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
        <li v-if="!isAdmin">
          <router-link @click="toggleUserPanel" to="/orders"
            class="block py-2 px-4 text-text hover:text-primary-200">Zamówienia</router-link>
        </li>
        <li v-if="!isAdmin">
          <router-link @click="toggleUserPanel " to="/profile"
            class="block py-2 px-4 text-text hover:text-primary-200">Twoje dane</router-link>
        </li>
        <li v-if="isLoggedIn && isAdmin">
          <router-link @click="toggleUserPanel" :to="{ name: 'AdminPanelPage'}"
            class="block py-2 px-4 text-text hover:text-primary-200">Panel Administratora</router-link>
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
      return this.$store.state.user.isLoggedIn;
    },
    isAdmin() {
      return this.$store.state.user.isAdmin;
    }
  },
  data() {
    return {
      showUserPanel: false,
      userPanelRight: '0px',
    };
  },
  methods: {
    fetchBooks() {
      this.$store.dispatch('book/fetchBooks');
    },
    toggleUserPanel() {
      this.showUserPanel = !this.showUserPanel;
      if (this.showUserPanel) {
        this.setUserPanelPosition();
      }
    },
    setUserPanelPosition() {
      this.$nextTick(() => {
        const userIconButton = this.$refs.userIconButton;
        if (userIconButton) {
          const rect = userIconButton.getBoundingClientRect();
          
          if(window.innerWidth - rect.right -96 +12 < 0){
            this.userPanelRight=`0px`;
            return;
          }

          this.userPanelRight = `${window.innerWidth - rect.right -96 +12}px`;
        }
      });
    },
    updatePanelPositionOnResize() {
      if (this.showUserPanel) {
        this.setUserPanelPosition();
      }
    },
    logout() {
      this.$store.dispatch('user/logout');

    }
  },
  mounted() {
    window.addEventListener('resize', this.updatePanelPositionOnResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updatePanelPositionOnResize);
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
  height: 150px;
}

.slide-down-leave-from {
  height: 150px;
}

.slide-down-leave-to {
  height: 0px;
}
</style>