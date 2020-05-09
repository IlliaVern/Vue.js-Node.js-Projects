<template>
  <div class="hello">
    <hr />
    <div>
      Title :
      <input type="text" v-model="title" />
    </div>
    <div>
      Price:
      <input type="number" v-model="price" />
    </div>
    <div>
      Image:
      <input type="file" @change="onSelect" />
      <img v-if="tmpImage" :src="tmpImage" class="img" />
    </div>

    <button @click="onSave">{{ buttonTitle }}</button>
    <hr />
    <div v-if="isLoading">Loading...</div>
    <div v-if="isError">Вибачте сталася помилка. Наші дрони вже вилетіли до Вас</div>

    <div v-if="!isLoading && !isError">
      <table border="2px">
        <tr v-for="product in getProductsList" :key="product.id">
          <td>{{ product.title }}</td>
          <td>{{ product.price }}</td>
          <td>
            <img v-if="product.img" :src="product.img" class="img" />
          </td>
          <td>
            <button @click="onDelete(product.id)">Delete</button>
            <button @click="onEdit(product)">Edit</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MyTest",

  data() {
    return {
      title: null,
      price: null,
      currentProductId: null,
      img: null,
      tmpImage: null
    };
  },

  computed: {
    ...mapGetters(["getProductsList", "isLoading", "isError"]),

    buttonTitle() {
      return this.currentProductId ? "Save" : "Add";
    }
  },

  methods: {
    ...mapActions(["loadProductsList", "saveProduct", "deleteProduct"]),

    clearData(){
      this.currentProductId = this.title = this.price = this.tmpImage = null;
    },
    onSave(){
      this.saveProduct({
      currentProductId: this.currentProductId,
      title: this.title,
      price: this.price,
      img: this.tmpImage
      });
      this.clearData()
    },
    
    onDelete(currentProductId) {
      this.deleteProduct({currentProductId})
    },
    onEdit(product) {
      this.title = product.title;
      this.price = product.price;
      this.currentProductId = product.id;
      this.tmpImage = product.img;
    },

    onSelect(e) {
      const reader = new FileReader();
      const self = this;
      reader.onloadend = function(e) {
        self.tmpImage = e.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  },

  mounted() {
    this.loadProductsList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img {
  width: 64px;
}
</style>
