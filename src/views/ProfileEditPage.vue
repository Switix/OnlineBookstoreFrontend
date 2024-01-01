<template>
    <div class="flex items-center justify-center py-4 bg-bg">
        <div class="max-w-md w-full space-y-4  flex flex-col">
            <div class="space-y-4 bg-bg-200 rounded-lg mx-4 shadow-md p-6 ">
                <h2 class="text-2xl font-bold text-center mb-4">Edycja Profilu</h2>
                <form @submit.prevent="updateProfile" class="space-y-4">
                    <div>
                        <label for="name" class="block font-semibold">Imię</label>
                        <input v-model="profileChange.name" @input="validateName" type="text" id="name" name="name"
                            class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none" :class="{
                                'border-accent text-accent focus:border-accent focus:ring-accent': profileChangeErrors.nameError,
                                'border-white focus:border-primary-200  focus:ring-primary-200': !profileChangeErrors.nameError
                            }">
                        <p v-if="profileChangeErrors.nameError" class="text-accent text-sm -mb-3 ">{{
                            profileChangeErrors.nameError }}</p>
                    </div>
                    <div>
                        <label for="lastname" class="block font-semibold">Nazwisko</label>
                        <input v-model="profileChange.lastname" @input="validateLastname" type="text" id="lastname"
                            name="lastname" class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none" :class="{
                                'border-accent text-accent focus:border-accent focus:ring-accent': profileChangeErrors.lastnameError,
                                'border-white focus:border-primary-200 focus:ring-primary-200': !profileChangeErrors.lastnameError
                            }">
                        <p v-if="profileChangeErrors.lastnameError" class="text-accent text-sm -mb-3 ">
                            {{ profileChangeErrors.lastnameError }}</p>
                    </div>
                    <div>
                        <label for="email" class="block font-semibold">Adres e-mail</label>
                        <input v-model="user.email" disabled type="email" id="email" name="email"
                            class="w-full p-2 opacity-70 bg-bg border  text-text-200 rounded-md ">
                    </div>
                    <div>
                        <label for="newEmail" class="block font-semibold">Nowy adres e-mail</label>
                        <input v-model="profileChange.email" @input="validateEmail" type="email" id="newEmail"
                            name="newEmail" class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none" :class="{
                                'border-accent text-accent focus:border-accent focus:ring-accent': profileChangeErrors.newEmailError,
                                'border-white focus:border-primary-200  focus:ring-primary-200': !profileChangeErrors.newEmailError
                            }">
                        <p v-if="profileChangeErrors.newEmailError" class="text-accent text-sm -mb-3 ">{{
                            profileChangeErrors.newEmailError }}</p>
                    </div>
                    <div>
                        <label for="password" class="block font-semibold">Aktualne hasło</label>
                        <input v-model="profileChange.password" @input="profileChangeErrors.passwordError = ''"
                            type="password" id="password" name="password"
                            class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none" :class="{
                                'border-accent text-accent focus:border-accent focus:ring-accent': profileChangeErrors.passwordError,
                                'border-white focus:border-primary-200  focus:ring-primary-200': !profileChangeErrors.passwordError
                            }" required>
                        <p v-if="profileChangeErrors.passwordError" class="text-accent text-sm -mb-3">{{
                            profileChangeErrors.passwordError }}</p>
                    </div>

                    <div class="flex justify-end">
                        <button type="submit" class="px-4 py-2 bg-primary text-text rounded-md hover:bg-primary-200">
                            Zapisz zmiany
                        </button>
                    </div>
                </form>
            </div>

            <div class="space-y-4 bg-bg-200 rounded-lg mx-4 shadow-md p-6 ">
                <h2 class="text-2xl font-bold text-center mb-4">Zmiana hasła</h2>
                <form @submit.prevent="updatePassword" class="space-y-4">

                    <div>
                        <label for="password" class="block font-semibold">Aktualne hasło</label>
                        <input v-model="passwordChange.password" type="password" id="password" name="password"
                            class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none" :class="{
                                'border-accent text-accent focus:border-accent focus:ring-accent': passwordChangeErrors.passwordError,
                                'border-white focus:border-primary-200  focus:ring-primary-200': !passwordChangeErrors.passwordError
                            }" required>
                        <p v-if="passwordChangeErrors.passwordError" class="text-accent text-sm -mb-3">Podane hasło jest
                            nieprawidłowe</p>
                    </div>
                    <div>
                        <label for="newPassword" class="block font-semibold">Nowe hasło</label>
                        <input v-model="passwordChange.newPassword" @focusout="validatePassword" type="password"
                            id="newPassword" name="newPassword"
                            class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none" :class="{
                                'border-accent text-accent focus:border-accent focus:ring-accent': (passwordChangeErrors.passwordMismatch || !passwordChangeErrors.isPasswordValid),
                                'border-white focus:border-primary-200  focus:ring-primary-200': (!passwordChangeErrors.passwordMismatch && passwordChangeErrors.isPasswordValid)
                            }" required>
                        <p v-if="!passwordChangeErrors.isPasswordValid" class="text-accent text-sm -mb-1"> Twoje hasło musi
                            zawierać co najmniej
                            8
                            znaków, w tym przynajmniej jedną cyfrę,
                            jedną dużą i jedną małą literę oraz co najmniej jeden znak specjalny. Upewnij się, że hasło nie
                            zawiera spacji.</p>
                    </div>
                    <div>
                        <label for="newPasswordRepeat" class="block font-semibold">Powtórz nowe hasło</label>
                        <input v-model="passwordChange.newPasswordRepeat" @focusout="validatePassword" type="password"
                            id="newPasswordRepeat" name="newPasswordRepeat"
                            class="w-full p-2 bg-bg border rounded-md focus:ring-1 outline-none" :class="{
                                'border-accent text-accent focus:border-accent focus:ring-accent': passwordChangeErrors.passwordMismatch,
                                'border-white focus:border-primary-200 focus:ring-primary-200': !passwordChangeErrors.passwordMismatch
                            }" required>
                        <p v-if="passwordChangeErrors.passwordMismatch" class="text-accent text-sm -mb-1">Hasła nie są takie
                            same.</p>
                    </div>
                    <div class="flex justify-end">
                        <button type="submit" class="px-4 py-2 bg-primary text-text rounded-md hover:bg-primary-200">
                            Zapisz hasło
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import _ from 'lodash';
export default {
    computed: {
        user() {
            return this.$store.state.user;
        },
        profileChange() {
            return {
                name: this.user.name,
                lastname: this.user.lastname,
                email: '',
                password: '',
            };
        },

        passwordChange() {
            return {
                password: '',
                newPassword: '',
                newPasswordRepeat: '',
            };
        },
    },
    data() {
        return {
            profileChangeErrors: {
                nameError: '',
                lastnameError: '',
                passwordError: '',
                newEmailError: '',
            },
            passwordChangeErrors: {
                passwordError: false,
                passwordMismatch: false,
                isPasswordValid: true,
            },

            validateEmailFn: _.debounce(function () {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                console.log(this.profileChange.email);
                if (this.profileChange.email === '') {
                    this.profileChangeErrors.newEmailError = '';
                }
                else if (!emailPattern.test(this.profileChange.email)) {
                    this.profileChangeErrors.newEmailError = 'Wprowadź poprawny adres email.';
                }
                else {
                    this.profileChangeErrors.newEmailError = '';
                }
            }, 500),
        };
    },
    methods: {
        validateEmail() {
            this.profileChangeErrors.newEmailError = '';
            this.validateEmailFn();
        },
        validateName() {
            if (this.profileChange.name.trim() === '') {
                this.profileChangeErrors.nameError = 'Imię nie może być puste'
            }
            else this.profileChangeErrors.nameError = '';
        },
        validateLastname() {
            if (this.profileChange.lastname.trim() === '') {
                this.profileChangeErrors.lastnameError = 'Nazwisko nie może być puste'
            }
            else this.profileChangeErrors.lastnameError = '';
        },
        validatePassword() {
            // Password requirements check
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~\-=`{}[\]:;"'<>,.?\\/])(?=.*[^\s]).{8,}$/;

            if (!passwordRegex.test(this.passwordChange.newPassword) && this.passwordChange.newPassword !== '') {
                this.passwordChangeErrors.isPasswordValid = false;
                return;
            }
            this.passwordChangeErrors.isPasswordValid = true;

            if (this.passwordChange.newPassword !== this.passwordChange.newPasswordRepeat && this.passwordChange.newPasswordRepeat !== '') {
                this.passwordChangeErrors.passwordMismatch = true;
                return;
            }
            this.passwordChangeErrors.passwordMismatch = false;
        },
        async updateProfile() {
            if (this.profileChangeErrors.lastnameError != '' || this.profileChangeErrors.nameError != ''
                || this.profileChangeErrors.newEmailError != '' || this.profileChangeErrors.passwordError != '') {
                return;
            }
            try {
                await this.$store.dispatch('updateUserProfile', this.profileChange);
            }
            catch (error) {
                if (error.response.status === 401) {
                    await this.$store.dispatch('logout');
                } else if (error.response.status === 403) {
                    this.profileChangeErrors.passwordError = "Podane hasło jest nieprawidłowe";
                } else if (error.response.status === 500) {
                    console.log(error);
                }
                return;
            }

        },
        async updatePassword() {
            this.passwordChangeErrors.passwordError=false;
            if (this.passwordChangeErrors.passwordMismatch || !this.passwordChangeErrors.isPasswordValid) {
                return;
            }
            try {
                const passwordData = {
                    password: this.passwordChange.password,
                    newPassword: this.passwordChange.newPassword,
                }
                await this.$store.dispatch('updateUserPassword', passwordData);
            }
            catch (error) {
                if (error.response.status === 401) {
                    await this.$store.dispatch('logout');
                } else if (error.response.status === 403) {
                    this.passwordChangeErrors.passwordError = true;
                } else if (error.response.status === 500) {
                    console.log(error);
                }
                return;
            }      
        }
    },
    watch: {
        profileChangeErrors: {
            deep: true,
            handler() {

            }
        },
        passwordChangeErrors: {
            deep: true,
            handler() {

            }
        },
    },
};
</script>
  
<style></style>