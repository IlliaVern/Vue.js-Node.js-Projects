<template>
  <section>
<b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>

    <b-field horizontal label="Name">
      <b-input type="text" placeholder="Please enter a name" v-model="name" required expanded></b-input>
    </b-field>

    <b-field horizontal label="Age">
      <b-input type="number" placeholder="Age" v-model="age" required expanded></b-input>
    </b-field>

    <b-field horizontal label="Ethnic">
      <b-select placeholder="Select a ethnic" v-model="ethnic" required expanded>
        <option value="Europeoid">Europeoid</option>
        <option value="Negroid">Negroid</option>
        <option value="Asian">Asian</option>
      </b-select>
    </b-field>
    <b-field horizontal label="Children">
      <div class="field" position="is-left">
        <b-switch v-model="children" true-value="Yes" false-value="No">{{ children }}</b-switch>
      </div>
    </b-field>

    <b-field horizontal label="Description">
      <b-input type="textarea" maxlength="128" placeholder="Enter description"
        v-model="description" required expanded></b-input>
    </b-field>

    <div class="buttons is-centered">
      <b-button type="is-primary" :disabled="!isDataValid" @click="saveGirl">{{saveButtonTitle}}</b-button>
      <b-button type="is-danger" @click="onCancel">Cancel</b-button>
    </div>
  </section>
</template>

<script>
// import store from "@/store"; //було
import {mapGetters, mapActions} from "vuex"

export default {
  name: "GirlEditor",
  data() {
    return {
      name: null,
      age: null,
      ethnic: null,
      description: null,
      isSwitched: false,
      children: "No"
    };
  },
  computed: {
    ...mapGetters("girls", ["getGirlToUpdate", "isLoading"]),

    girlId() {
      return this.$route.params.girlId;
    },
    
    isDataValid() {
      return (this.name && this.age && this.ethnic && this.children && this.description);
    },
    saveButtonTitle() {
      return this.girlId ? "Save" : "Add";
    }
  },
  watch: {
    isLoading(newValue) {
      if(!newValue) {
      const girlToUpdate = this.getGirlToUpdate
      this.name = girlToUpdate.name;
      this.age = girlToUpdate.age;
      this.ethnic = girlToUpdate.ethnic;
      this.children = girlToUpdate.children;
      this.description = girlToUpdate.description;
      }
    }
  },
  methods: {
    ...mapActions("girls", ["addGirl", "updateGirl", "findGirlById"]),
    saveGirl() {
      if (this.girlId) {
        this.updateGirl({
          _id: this.girlId,
          name: this.name,
          age: this.age,
          ethnic: this.ethnic,
          children: this.children,
          description: this.description
        });
      } else {
        this.addGirl({name:this.name, age:this.age, ethnic:this.ethnic, children:this.children, description:this.description});
      }
      this.$router.push({ path: "/girls" });
    },
    onCancel() {
      this.$router.push({ path: "/girls" });
    }
  },
  created() { 
    
    if (this.girlId) {
      this.findGirlById(this.girlId)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>