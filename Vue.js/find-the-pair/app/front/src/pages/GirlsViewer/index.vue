<template>
  <div>
    <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
    <div>
      All proposals <hr>
    </div>
    <div>
      <girls-cards />
    </div>
  </div>
</template>

<script>
import { mapGetters} from "vuex"
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
      if(newVal) {this.danger()}
    }
  },
  methods: {

    danger() {
      const notif = this.$buefy.notification.open({
        duration: 5000,
        message: 'Error',
        position: 'is-top-right',
        type: 'is-danger',
        hasIcon: true
      })
      notif.$on("close", ()=>{
        this.$buefy.notification.open("Custom specification closed")
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>