<template>
  <section>
<b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
    {{pageHeader}} girl
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
    <b-field horizontal label="Image" class="file">
        <input type="file" @change="onSelect" />
        <span class="file-name" v-if="imgFile">{{ imgFile.name }}</span>
        <img v-if="girlId" :src="imgFile" class="uploadedImg" />
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
      isSwitched: false,
      children: "No",
      imgFile: null,
      description: null
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
    },
    pageHeader(){
      return this.girlId ? "Update" : "Add"
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
      this.imgFile = girlToUpdate.imgFile;
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
          imgFile: this.imgFile,
          description: this.description
        });
      } else {
        this.addGirl({name:this.name, age:this.age, ethnic:this.ethnic, children:this.children, imgFile: this.imgFile, description:this.description});
      }
      this.$router.push({ path: "/girls" });
    },
    onSelect(e) {
      const reader = new FileReader();
      const self = this;
      reader.onloadend = function(e) {
        self.imgFile = e.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
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

<style lang="css" scoped>
  .uploadedImg {
  width: 60px;
  height: 60px;
}
</style>