<template>
  <div class="card column">
    <div class="card-image">
      <figure class="image">
        <img :src="girl.imgFile" alt="Girl image" class="girlImg">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{girl.name}}</p>
          <p class="subtitle is-6">Age: {{girl.age}}</p>
          <p class="subtitle is-6">Ethnic: {{girl.ethnic}}</p>
          <p class="subtitle is-6">Children: {{girl.children}}</p>
          <p class="subtitle is-6">{{girl.description}}</p>
        </div>
      </div>

    </div>
    <footer class="card-footer">
      <div class="buttons level">
          <b-button type="is-link" tag="router-link" :to="`girls/edit/${girl._id}`">Edit</b-button>
          <b-button type="is-danger" @click="deleteGirl(girl._id)">Delete</b-button>
      </div>
    </footer>
  </div>
</template>

<script>
import {mapActions} from "vuex"

export default {
  name: "GirlCard",
  props: {
    girl: {
      type: Object,
      required: true
    }
  },
  
  methods: {
    ...mapActions("girls", ["deleteGirl"]),
  }
};
</script>

<style lang="css" scoped>
  .girlImg {
  width: 150px;
  height: 150px;
}

</style>