<template>
  <div>
    All proposals
    <div class="columns">
    <div v-for="girl in girls" :key="girl.id" class="column is-one-fifth">
      <girl-card :girl="girl" />
    </div>
  </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import GirlCard from "./c/GirlCard";
export default {
  name: "GirlsViewer",
  components: {
    GirlCard
  },
 
  
  methods: {
    ...mapActions("girls",["loadGirlsList","deleteGirl"]),

    deleteGirl(girlId) {
      this.girls = this.deleteGirl(girlId);
      this.girls = this.loadGirlsList();
    }
  },
  computed: {
    ...mapGetters("girls", ["getGirlsList"]),

    girls() {
      return this.loadGirlsList();
    },
    girlId() {
      return this.$route.params.girlId;
    }
  },
  mounted() {
    
    this.loadGirlsList();
  }
};
</script>

<style lang="scss" scoped>
</style>