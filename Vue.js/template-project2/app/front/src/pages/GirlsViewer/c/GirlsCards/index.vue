<template>
  <div class="columns">
    <div v-for="girl in girls" :key="girl.id" class="card column">
      <girl-card :girl="girl" />
    </div>
  </div>
</template>

<script>
import GirlCard from "./c/GirlCard";
import { mapActions, mapGetters } from "vuex";
// import store from "@/store";                        // було
export default {
  name: "GirlsCards",
  components: {
    GirlCard
  },
  
  computed: {
    ...mapGetters("girls", ["getGirlsList"]),
    girls() {
      return this.getGirlsList();
    },
    // girls() {                                         // було
    //   return store.loadGirlsList();
    // },
  },
};
</script>

<style lang="scss" scoped>
</style>