<template>
  <div>
    All proposals
    <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
    <girls-cards />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
import GirlsCards from "./c/GirlsCards";

export default {
  name: "GirlsViewer",
  components: {
    GirlsCards,
  },
  computed: {
    ...mapGetters("girls", ["isLoading", "isError"])
  },
  watch: {
    isError(newVal){
      if(newVal) this.danger()
    }
  },
  methods: {
    ...mapActions("girls", ["loadGirlsList"]),

    danger() {
      const notif = this.$buefy.notification.open({
        duration: 5000,
        message: 'Error',
        position: 'is-top-right',
        type: 'is-danger',
        hasIcon: 'true'
      })
      notif.$on("close", ()=>{
        this.$buefy.notification.open("Custom specification closed")
      })
    }
  },
  mounted() {
    this.loadGirlsList()
  }
};
</script>

<style lang="scss" scoped>
</style>