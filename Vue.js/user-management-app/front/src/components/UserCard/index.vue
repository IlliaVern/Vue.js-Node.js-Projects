<template>
  <div>
    <b-col>
      <b-card>
        <b-card-body>
          <b-card-title>{{user.firstName }} {{user.lastName}}</b-card-title>
          <b-card-sub-title class="mb-2">{{user.email}}</b-card-sub-title>
          <b-card-sub-title class="mb-2">{{user.phoneNumber}}</b-card-sub-title>
          <b-card-text>{{user.address}}</b-card-text>
          <b-button-group class="mx-1">
            <b-button variant="info" v-b-tooltip.hover title="Edit user" :to="`users/${user._id}`">Edit</b-button>
            <b-button variant="danger" v-b-tooltip.hover title="Delete user" @click="deleteUser(user._id)">Delete</b-button>
          </b-button-group>
        </b-card-body>
      </b-card>
    </b-col>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions("users", ["deleteUser"])
  }
}
</script>

<style scoped></style>
