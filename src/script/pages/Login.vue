<template>
    <div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div class="w-full max-w-sm space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Or
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">start your 14-day free trial</a>
          </p>
        </div>
        <form @submit.prevent="handleSubmit">
          <span v-if="message" class="text-red-500 mb-4">{{ message }}</span>
          <div class="-space-y-px rounded-md shadow-sm">
            <div>
              <label for="username" class="sr-only">Username</label>
              <input v-model="username" name="username" type="text" autocomplete="username" required class="p-2 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Username">
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input v-model="password" name="password" :type="passwordFieldType" autocomplete="current-password" required class="p-2 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password">
            </div>
          </div>

          <div class="flex items-center justify-between mt-3 mb-3">
            <div class="flex items-center">
              <input v-model="showPassword" id="show-hide" name="show-hide" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
              <label for="show-hide" class="ml-2 block text-sm text-gray-900">Show/Hide</label>
            </div>
          </div>

            <button type="submit" class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                </svg>
              </span>
              Sign in
            </button>
        </form>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: '',
        showPassword: false,
        message: ''
      }
    },
    computed: {
      passwordFieldType() {
        return this.showPassword ? 'text' : 'password';
      },
    },
    methods: {
      async handleSubmit() {
        try {
          const { data } = await axios.post('authentications', {
            username: this.username,
            password: this.password,
          });
          const { accessToken, refreshToken } = data.data;
          this.username = '';
          this.password = '';
          localStorage.setItem('token', accessToken);
          localStorage.setItem('tokenRefresh', refreshToken);
          this.$router.push({ name: 'HomePage' });
          this.$router.go();
        } catch (error) {
          const { response, request } = error;
          if (response) {
            const { message } = response.data;
            console.log(message);
            this.message = message;
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