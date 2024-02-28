<template>
    <div class="flex items-center justify-center h-screen bg-bg">
        <div class="max-w-md w-full mx-4 p-6 bg-bg-200 rounded-lg shadow-md flex flex-col">
            <h2 class="text-2xl font-bold text-center mb-4">Rejestracja</h2>
            <form @submit.prevent="register" class="space-y-4">
                <div>
                    <label for="name" class="block font-semibold">Imię</label>
                    <input v-model="name" type="text" id="name" name="name"
                        class="w-full p-2 bg-bg border ring-white text-text-200  rounded-md focus:border-primary-200 focus:ring-1 focus:ring-primary-200  outline-none"
                        required>
                </div>
                <div>
                    <label for="lastname" class="block font-semibold">Nazwisko</label>
                    <input v-model="lastname" type="text" id="lastname" name="lastname"
                        class="w-full p-2 bg-bg border ring-white text-text-200  rounded-md focus:border-primary-200 focus:ring-1 focus:ring-primary-200  outline-none"
                        required>
                </div>
                <div>
                    <label for="email" class="block font-semibold">Email</label>
                    <input v-model="email" @input="validateEmail" type="email" id="email" name="email"
                        class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none" :class="{
                            'border-accent text-accent focus:border-accent focus:ring-accent': emailError,
                            'border-white focus:border-primary-200 focus:ring-primary-200': !emailError
                        }">
                    <p v-if="emailError" class="text-accent text-sm -mb-3 ">{{ emailError }}</p>
                </div>
                <div>
                    <label for="password" class="block font-semibold">Hasło</label>
                    <input v-model="password" type="password" id="password" @focusout="validatePassword" name="password"
                        class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none" :class="{
                            'border-accent text-accent focus:border-accent focus:ring-accent': (passwordMismatch || !isPasswordValid),
                            'border-white focus:border-primary-200 focus:ring-primary-200': (!passwordMismatch && isPasswordValid)
                        }" required>
                    <p v-if="!isPasswordValid" class="text-accent text-sm -mb-1"> Twoje hasło musi zawierać co najmniej 8
                        znaków, w tym przynajmniej jedną cyfrę,
                        jedną dużą i jedną małą literę oraz co najmniej jeden znak specjalny. Upewnij się, że hasło nie
                        zawiera spacji.</p>
                </div>
                <div>
                    <label for="repeatPassword" class="block font-semibold">Powtórz hasło</label>
                    <input v-model="repeatPassword" type="password" id="repeatPassword" name="repeatPassword"
                        class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none" :class="{
                            'border-accent text-accent focus:border-accent focus:ring-accent': passwordMismatch,
                            'border-white focus:border-primary-200 focus:ring-primary-200': !passwordMismatch
                        }" required>
                    <p v-if="passwordMismatch" class="text-accent text-sm -mb-1">Hasła nie są takie same.</p>
                </div>
                <div>
                    <button type="submit" class="w-full bg-primary text-text py-2 rounded-md hover:bg-blue-600">Zarejestruj
                        się</button>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
import _ from 'lodash';
export default {
    data() {
        return {
            name: '',
            lastname: '',
            email: '',
            password: '',
            repeatPassword: '',
            passwordMismatch: false,
            isPasswordValid: true,
            validateEmailFn: _.debounce(function () {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(this.email)) {
                    this.$store.dispatch('setEmailError', 'Wprowadź poprawny adres email.');
                } else {
                    this.$store.dispatch('setEmailError', '');
                }
            }, 500),
        };
    },
    mounted() {
        this.$store.dispatch('user/setEmailError', '');
    },
    computed: {
        emailError() {
            return this.$store.state.user.emailError;
        }
    },
    methods: {
        validateEmail() {
            this.$store.dispatch('user/setEmailError', '');
            this.validateEmailFn();
        },
        validatePassword() {
            // Password requirements check
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~\-=`{}[\]:;"'<>,.?\\/])(?=.*[^\s]).{8,}$/;

            if (!passwordRegex.test(this.password) && this.password !== '') {
                this.isPasswordValid = false;
                return;
            }
            this.isPasswordValid = true;
        },

        async register() {
            
            this.validatePassword();
            if (!this.isPasswordValid || this.emailError !='') {
                return;
            }
            if (this.password !== this.repeatPassword && this.repeatPassword !== '') {
                this.passwordMismatch = true;
                return;
            }
            this.passwordMismatch = false;
            this.$store.dispatch('user/setEmailError', '');

            const userData = {
                email: this.email,
                name: this.name,
                lastname: this.lastname,
                password: this.password
            };
            await this.$store.dispatch('user/register', userData);
        }
    }
};



</script>
  
<style>
input:autofill {
    -webkit-text-fill-color: theme('textColor.text.200');
    caret-color: theme('textColor.text.200');
    box-shadow: inset 0 0 0 1000px theme('colors.bg.DEFAULT') !important;
}

input:autofill:focus {
    box-shadow: inset 0 0 0 1000px theme('colors.bg.DEFAULT'), 0 0 0 1px theme('colors.primary.200') !important ;
}
</style>