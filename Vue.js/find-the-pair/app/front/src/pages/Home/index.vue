<template>
    <div>
        <h3>Hello</h3> <hr>
        Hello dear Visitor and thank you to visit our FindThePair App
        <div v-if="!isAuthenticated()">
            Please Login or Signup to start using our app and good luck...
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex"
    export default {
        name: "Home",
        computed: {
            ...mapGetters("authorization", ["isAuthenticated"])
        },
    }
</script>

<style lang="scss" scoped>

</style>