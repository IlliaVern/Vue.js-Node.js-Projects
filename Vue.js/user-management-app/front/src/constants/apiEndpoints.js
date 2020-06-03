export default {
    users: {
        read: `${process.env.VUE_APP_API_URL}/users`,
        add: `${process.env.VUE_APP_API_URL}/users/add`,
        delete: `${process.env.VUE_APP_API_URL}/users`,
        update: (id) => `${process.env.VUE_APP_API_URL}/users/${id}`,
        findById: (id) => `${process.env.VUE_APP_API_URL}/users/${id}`
    }
};