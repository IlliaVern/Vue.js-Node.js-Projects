<template>
  <div class="columns">
    <div v-for="(girl, girlId) in getGirlsList" :key="girlId" class="column">
      <girl-card :girl="girl" />
    </div>
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

<style lang="scss" scoped>
</style>