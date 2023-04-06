<template>
  <NavBar :user="user"/>

  <div class="auth-wrapper">
    <div class="auth-inner">
      <RouterView :user="user" :message="message"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from '../components/Nav.vue'
export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      user: null,
      message: null
    }
  },
  async created() {
    const response = await axios.get('users');
    this.message = response.data.message
    this.user = response.data.data.user
  }
}
</script>

<style></style>