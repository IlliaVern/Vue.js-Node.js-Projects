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
              <a v-if="!isAuthenticated()" class="button is-primary" href="/signup"><strong>Sign up</strong></a> 
              <a v-if="!isAuthenticated()" class="button is-light" href="/login"><strong>Log in</strong></a>
              <a v-if="isAuthenticated()" class="button is-primary" @click="onLogout"><strong>Log out</strong></a> 
            </div> 
          </b-navbar-item> 
        </template> 
      </b-navbar>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions} from "vuex"
export default {
  name: "App",
  computed: {
    ...mapGetters("authorization", ["isAuthenticated"])
  },
  methods: {
    ...mapActions("authorization", ["logout"]),

    onLogout(){
      this.logout()
      this.$router.push({path:"/login"})
    }
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
  margin-top: 10px;
}
</style>


