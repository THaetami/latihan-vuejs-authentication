<template>
    <NavBar />

    <RouterView />
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
  created() {
    this.getUser()
  },
  methods: {
    ...mapActions(["getuser"]),
    async getUser() {
      try {
        const response = await axios.get('users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.getuser(response.data.data.user)
      } catch (error) {
        const { response, request } = error;
        if (response) {
          const { message } = response.data;
          console.log(message);
          if (response.status === 400) {
            this.$store.dispatch('getuser', null)
          }
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

<style></style>