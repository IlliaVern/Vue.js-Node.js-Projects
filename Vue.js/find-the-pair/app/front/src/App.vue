<template>
  <div id="app">
    <template>
      <b-navbar>
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img
              src="../src/assets/images/logo-1.jpg"
              alt="FindThePair Logo"
            />
          </b-navbar-item>
        </template>
        <template slot="start">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">Home page</b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/girls' }">All girls</b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/girls/add' }">Add girl</b-navbar-item>
        </template>

        <template slot="end">
          <b-navbar-item tag="div"> 
            <div class="buttons"> 
              <a class="button is-primary"> 
                <strong>Sign up</strong> 
              </a> 
              <a class="button is-light">Log in</a> 
            </div> 
          </b-navbar-item> 
        </template> 
      </b-navbar>
    </template>
    <!-- отображаем тут компонент, для которого совпадает маршрут -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
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
  background-color: #FFB6C1;
  margin-top: 60px;
}
</style>


