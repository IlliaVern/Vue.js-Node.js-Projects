<template>
  <div class="columns">
    <div v-for="girl in girls" :key="girl.id" class="card column">
      <girl-card :girl="girl" />
    </div>
  </div>
</template>

<script>
import GirlCard from "./c/GirlCard";
import { mapGetters } from "vuex";
export default {
  name: "GirlsCards",
  components: {
    GirlCard
  },
  data() {
    return {
      girls: this.getGirlsList
    }
  },
  computed: {
    ...mapGetters("girls", ["getGirlsList"]),
    // girls() {
    //   return this.getGirlsList();
    // },
    
  },
};
</script>

<style lang="scss" scoped>
</style>