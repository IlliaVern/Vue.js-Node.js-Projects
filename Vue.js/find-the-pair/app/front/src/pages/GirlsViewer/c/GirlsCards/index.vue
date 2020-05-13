<template>
  <div class="columns">
      <girl-card v-for="(girl, girlId) in getGirlsList" :key="girlId" :girl="girl"/>
  </div>
</template>

<script>
import GirlCard from "./c/GirlCard";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "GirlsCards",
  components: {
    GirlCard
  },
  
  computed: {
    ...mapGetters("girls", ["getGirlsList"]),
    
  },
  methods: {
    ...mapActions("girls", ["loadGirlsList"]) 
  },
  mounted() {
    this.loadGirlsList()
  }
};
</script>

<style lang="css" scoped>
</style>