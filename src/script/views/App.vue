<template>
    <NavBar />

    <!-- <div class="auth-wrapper"> -->
      <!-- <div class="auth-inner"> -->
        <RouterView />
      <!-- </div> -->
    <!-- </div> -->
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import NavBar from '../components/Nav.vue'
export default {
  name: 'App',
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    this.getUser()
  },
  methods: {
    ...mapActions(["getuser"]),
    async getUser() {
      const response = await axios.get('users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      this.getuser(response.data.data.user)
    }
  }
}
</script>

<style></style>