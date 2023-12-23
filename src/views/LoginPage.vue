<template>
    <div class="flex items-center justify-center h-full bg-bg">
    <div class="max-w-md w-full mx-4 p-6 bg-bg-200 rounded-lg shadow-md flex flex-col">
      <h2 class="text-2xl font-bold text-center mb-4">Logowanie</h2>

      <form @submit.prevent="login" class="flex flex-col space-y-4 flex-grow">
        <div>
          <label for="email" class="block font-semibold">Email</label>
          <input v-model="email" type="email" id="email" name="email"
            class="w-full p-2 bg-bg border border-white rounded-md focus:border-primary-200 outline-none" required>
        </div>
        <div>
          <label for="password" class="block font-semibold">Hasło</label>
          <input v-model="password" type="password" id="password" name="password"
            class="w-full p-2 bg-bg border border-white  rounded-md focus:border-primary-200 outline-none" required>
        </div>
        <div>
          <button type="submit"
            class="flex items-center justify-center w-full bg-primary text-text py-2 rounded-md hover:bg-blue-600">
            {{ logginButtonTitle }}
            <svg v-if="loggingIn" class="animate-spin ml-2 h-5 w-5 text-text" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </button>
        </div>
      </form>
      <!-- Wyświetlanie komunikatu o błędzie -->
      <div v-if="loginError" class="text-accent text-center mt-4">{{ loginError }}</div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      loggingIn: false,
      logginButtonTitle: 'Zaloguj',
    };
  },
  computed: {
    loginError() {
      return this.$store.state.loginError;
    }
  },
  methods: {
    async login() {
      this.$store.dispatch('clearLoginError');
      this.loggingIn = true;
      this.logginButtonTitle = 'Logowanie'
      const userData = {
        email: this.email,
        password: this.password
      };
      await this.$store.dispatch('login', userData);
     
      if (!this.loginError) {
        this.$router.push('/');
      }
      
      this.logginButtonTitle = 'Zaloguj'
      this.loggingIn = false;
    }
  }
};
</script>
  
<style></style>