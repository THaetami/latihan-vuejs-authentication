<template>
  <NavBar />

  <div class="auth-wrapper">
    <div class="auth-inner">
      <RouterView />
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav.vue'
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style></style>