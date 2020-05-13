<template>
  <section>
    <h2>Login</h2> <hr>
      <div>To enter FindThePair App please log in</div>

      <b-field label="Email">
        <b-input type="email" value="john@" maxlength="40" name="email" v-model="email"></b-input>
      </b-field>

      <b-field label="Password">
        <b-input value="123" type="password" maxlength="30" name="password" v-model="password"></b-input>
      </b-field>
      <div v-if="message">{{message}}</div>
      <div><b-button @click="submit">Login</b-button></div>
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
        ...mapActions("authorization", ["login", "logout"]),

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