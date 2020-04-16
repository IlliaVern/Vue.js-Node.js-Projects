<template>
  <section>
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
      <b-input
        type="textarea" maxlength="128"
        placeholder="Enter description"
        v-model="description"
        required
        expanded
      ></b-input>
    </b-field>

    <div class="level">
      <b-button type="is-primary" :disabled="!isDataValid" @click="saveGirl" class="levelp-left">{{saveButtonTitle}}</b-button>
      <b-button type="is-danger" @click="onCancel" class="levelp-right">Cancel</b-button>
    </div>
  </section>
</template>

<script>
// import store from "@/store";
import {mapActions} from 'vuex';

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
  methods: {
    ...mapActions("girls", ["addGirl", "updateGirl", "getGirlById"]),
    saveGirl() {
      if (this.girlId) {
        this.updateGirl({
          id: this.girlId,
          name: this.name,
          age: this.age,
          ethnic: this.ethnic,
          children: this.children,
          description: this.description
        });
      } else {
        this.addGirl(this.name, this.age, this.ethnic, this.children, this.description);
      }
      this.$router.push({ path: "/all" });
    },
    // saveGirl() {
    //   if (this.girlId) {
    //     store.updateGirl({
    //       id: this.girlId,
    //       name: this.name,
    //       age: this.age,
    //       ethnic: this.ethnic,
    //       children: this.children,
    //       description: this.description
    //     });
    //   } else {
    //     store.addGirl(this.name, this.age, this.ethnic, this.children, this.description);
    //   }
    //   this.$router.push({ path: "/all" });
    // },
    onCancel() {
      this.$router.push({ path: "/all" });
    }
  },
  created() {
    if (this.girlId) {
      // const girl = store.getGirlById(this.girlId);
      const girl = this.getGirlById(this.girlId);
      this.name = girl.name;
      this.age = girl.age;
      this.ethnic = girl.ethnic;
      this.children = girl.children;
      this.description = girl.description;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>