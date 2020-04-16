<template>
  <div class="columns">
    <div v-for="girl in girls" :key="girl.id" class="column is-one-fifth">
      <girl-card :girl="girl" />
    </div>
  </div>
</template>

<script>
import store from "@/store";
import GirlCard from "./c/GirlCard";
export default {
  name: "GirlsCards",
  components: {
    GirlCard
  },
  
  computed: {
    girls() {
      return store.readGirls();
    },
    girlId() {
      return this.$route.params.girlId;
    }
  },
  // created() {
  //   this.girls = store.readGirls();
  // }
};
</script>

<style lang="scss" scoped>
</style>