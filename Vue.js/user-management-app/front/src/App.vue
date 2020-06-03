<template>
  <div id="app">
    <b-nav tabs align="center">
      <b-nav-item :to="{ path: '/' }">Home</b-nav-item>
      <b-nav-item :to="{ path: '/users' }">Users manager</b-nav-item>
      <b-nav-item :to="{ path: '/users/add' }">User Editor</b-nav-item>
    </b-nav>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
