<template>
  <section>
    <h2>Login</h2>
    <form @submit.prevent="submit">
      <div>To enter FindThePair App please log in</div>

      <b-field label="Email" type="is-danger" message="This email is invalid">
        <b-input type="email" value="john@" maxlength="40" v-model="email"></b-input>
      </b-field>

      <b-field
        label="Password"
        type="is-warning"
        :message="['Password is too short', 'Password must have at least 8 characters']"
      >
        <b-input value="123" type="password" maxlength="30" v-model="password"></b-input>
      </b-field>
      <div v-if="message">{{message}}</div>
      <div><b-button type="submit" @click="submit">Login</b-button></div>
      <!-- <div><b-button @click="submit">Login</b-button></div> -->
    </form>
  </section>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            message: ""
        }
    },
    methods: {
        ...mapActions("authorization", ["signup", "logout"]),

        async submit() {
            try {
                const user = {email: this.email, password: this.password}
                const result = await this.login(user)
                if(result === true) {
                    this.message=""
                    this.$router.push({path:"/"})
                } else {
                    this.message = "Login error!" //"Signup error"
                }
            } catch (err) {
                this.message = err.response.data.error
            }
        }
    },
    created(){
        this.logout()
    }
};
</script>

<style lang="scss" scoped>
</style>