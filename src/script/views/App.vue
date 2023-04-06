<template>
    <NavBar />

    <div class="auth-wrapper">
      <div class="auth-inner">
        <RouterView />
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
  async mounted() {
    const response = await axios.get('users');
      this.$store.dispatch('user', response.data.data.user)
  }
}
</script>

<style></style>