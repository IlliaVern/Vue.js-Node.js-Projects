<template>
    <div>
        <h3>Home</h3>
        <div>
            <b-button variant="outline-primary" :to="`/users`">Manage users</b-button>
            <b-button variant="outline-success" :to="`/users/add`">Add new user</b-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',

    }
</script>

<style lang="scss" scoped>

</style>