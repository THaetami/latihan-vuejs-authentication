<template>
    <div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-sm space-y-8">
        <div>
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign Up to your account</h2>
        </div>
        <form class="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true">
            <div class="-space-y-px rounded-md shadow-sm">
            <div class="text-left">
                <label for="fullname" class="sr-only">Fullname</label>
                <input v-model.trim="fullname" @input="validateFullname" name="fullname" type="input" autocomplete="fullname" class="p-2 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Fullname">
                <small v-if="fullnameErrorMessage" class="text-red-500">{{ fullnameErrorMessage }}</small>
            </div>
            <div class="text-left">
                <label for="username" class="sr-only">Username</label>
                <input v-model.trim="username" @input="validateUsername" name="username" type="input" autocomplete="username" class="p-2 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Username">
                <small v-if="usernameErrorMessage" class="text-red-500">{{ usernameErrorMessage }}</small>
            </div>
            <div class="text-left">
                <label for="password" class="sr-only">Password</label>
                <input v-model.trim="password" @input="validatePassword" name="password" :type="passwordFieldType" autocomplete="current-password" class="p-2 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password">
                <small v-if="passwordErrorMessage" class="text-red-500">{{ passwordErrorMessage }}</small>
            </div>
            </div>

            <div class="flex items-center justify-between">
            <div class="flex items-center">
                <input v-model="showPassword" id="show-hide" name="show-hide" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                <label for="show-hide" class="ml-2 block text-sm text-gray-900">Show/Hide</label>
            </div>
            </div>

            <button @click.prevent="handleSubmit" type="button" class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                </svg>
                </span>
                Sign up
            </button>
        </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'RegisterPage',
    data() {
        return {
            fullname: '',
            username: '',
            password: '',
            showPassword: false,
            usernameErrorMessage: '',
            fullnameErrorMessage: '',
            passwordErrorMessage: '',
            valid: false
        }
    },
    computed: {
      passwordFieldType() {
        return this.showPassword ? 'text' : 'password';
      },
    },
    methods: {
        validateUsername() {
            if (this.username.length < 3) {
                this.usernameErrorMessage = 'Username minimal 3 karakter';
            } else if (!/^[a-zA-Z0-9]+$/.test(this.username)) {
                this.usernameErrorMessage = 'Username hanya menggunakan karakter alfanumerik';
            } else {
                this.usernameErrorMessage = '';
                this.valid = true
            }
        },
        validateFullname() {
            if (this.fullname.length < 3) {
                this.fullnameErrorMessage = 'Name minimal 3 karakter';
                 this.valid = false
            } else if (!/^[a-zA-Z\s]+$/.test(this.fullname.trim())) {
                this.fullnameErrorMessage = 'Name hanya menggunakan karakter alphabet';
                 this.valid = false
            } else {
                this.fullnameErrorMessage = '';
                this.valid = true
            }
        },
        validatePassword() {
            if (this.password.length < 5) {
                this.passwordErrorMessage = 'Password minimal 5 karakter';
                 this.valid = false
            } else if (!/^[a-zA-Z0-9]+$/.test(this.password)) {
                this.passwordErrorMessage = 'Password hanya menggunakan karakter alfanumerik';
                 this.valid = false
            } else {
                this.passwordErrorMessage = '';
                 this.valid = true
            }
        },
        async handleSubmit(){
            try {
                if (this.valid) {
                    const response = await axios.post('users', {
                        fullname: this.fullname,
                        username: this.username,
                        password: this.password,
                    });
                    this.valid = false
                    this.fullname = ''
                    this.username = ''
                    this.password = ''
                    this.$router.push({ name: 'LoginPage' })
                    console.log(response)
                }
            } catch (error) {
                const { response, request } = error;
                if (response) {
                    const { message } = response.data;
                    console.log(message);
                    this.usernameErrorMessage = message;
                } else if (request) {
                    console.log(request);
                } else {
                    console.log('Error', error.message);
                }
            }
            
        }
    }
}
</script>