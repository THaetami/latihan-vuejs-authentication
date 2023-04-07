<template>
    <NavBar />

    <div class="auth-wrapper">
      <div class="auth-inner">
        <RouterView />
      </div>
    </div>
</template>

<script>
// import axios from 'axios';
import { mapActions } from 'vuex';
import NavBar from '../components/Nav.vue'
export default {
  name: 'App',
  components: {
    NavBar
  },
  computed: {
    ...mapActions(['getuser'])
  },
}
</script>

<style></style>