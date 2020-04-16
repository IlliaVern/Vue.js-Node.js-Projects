<template>
  <div>
    All proposals
    <girls-cards />
  </div>
</template>

<script>
import GirlsCards from "./c/GirlsCards";

export default {
  name: "GirlsViewer",
  components: {
    GirlsCards,
  },
  data() {
    return {}
  },
};
</script>

<style lang="scss" scoped>
</style>