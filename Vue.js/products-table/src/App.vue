<template>
  <div id="app">
    <h1>ProductsTable</h1>
    <MyTest msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import MyTest from "./components/MyTest.vue";

export default {
  name: "App",
  components: {
    MyTest
  }
};
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
