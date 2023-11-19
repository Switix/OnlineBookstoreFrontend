<template>
    <div >
        <form v-on:submit.prevent="register">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" placeholder="Username" v-model="form.username">
            <label for="email">Email</label>
            <input type="text" class="form-control" id="email" placeholder="Email" v-model="form.email">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="form.password">
            <button>Submit</button>
        </form>

    </div>
  </template>
  
  <script>
  export default {
    name: 'RegisterPage',
    data(){
        return{
            form: {
                username: '',
                email: '',
                password:''
            }
        }
    },
    methods:{
        register(){
            this.$axios.post('http://localhost:8080/api/auth/register', this.form)
                 .then((res)  => {
                     console.log(res);
                 })
                 .catch((error) => {
                    console.log(error);
                 }).finally(() => {
                     //Perform action in always
                 });
        }
    }
  }
  </script>
  
  <style scoped>

  </style>
  