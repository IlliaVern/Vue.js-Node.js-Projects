<template>
  <div class="card has-max-width-300">
    <div class="card-image">
      <figure class="image is-1by">
        <img src="https://bulma.io/images/placeholders/256x256.png" alt="Card image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/64x64.png" alt="Citelogo image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{girl.name}}</p>
          <p class="subtitle is-6">Age: {{girl.age}}</p>
          <p class="subtitle is-6">Ethnic: {{girl.ethnic}}</p>
          <p class="subtitle is-6">Children: {{girl.children}}</p>
        </div>
      </div>

      <div class="content">{{girl.description}}</div>
    </div>
    <footer class="card-footer">
      <div class="buttons level">
          <b-button tag="router-link" :to="`/edit/${girl.id}`" type="is-link">Edit</b-button>
          <b-button type="is-danger" icon-left="delete" @click="deleteGirl(girl.id)">Delete</b-button>
      </div>
    </footer>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "GirlCard",
  props: {
    girl: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      girls: []
    };
  },
  computed: {
    girlId() {
      return this.$route.params.girlId;
    }
  },
  methods: {
    deleteGirl(girlId) {
      this.girls = store.deleteGirl(girlId);
      // this.girls = store.readGirls();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>