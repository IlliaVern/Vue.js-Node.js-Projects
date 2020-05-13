<template>
  <section>
    <h2>Signup</h2> <hr>
      <b-field label="Email">
        <b-input type="email" value="john@" maxlength="40" name="email" v-model="email"></b-input>
      </b-field>

      <b-field label="Password">
        <b-input value="123" type="password" minlength="6" maxlength="30" name="password" v-model="password"></b-input>
      </b-field>
      <div v-if="message">{{message}}</div>
      <div><b-button @click="submit">Signup</b-button></div>
  </section>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    name: "Signup",
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
                const user = {
                    email: this.email,
                    password: this.password
                }
                const result = await this.signup(user)
                if(result === true) {
                    this.message=""
                    this.$router.push({path:"/login"})
                } else {
                    this.message = result
                }
            } catch (err) {
                this.message = err.message
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