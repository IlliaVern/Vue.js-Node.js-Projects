export default {
    // users: {
    //     read: `${process.env.VUE_APP_API_URL}/users`,
    //     add: `${process.env.VUE_APP_API_URL}/users/add`,
    //     delete: `${process.env.VUE_APP_API_URL}/users`,
    //     update: (id) => `${process.env.VUE_APP_API_URL}/users/${id}`,
    //     findById: (id) => `${process.env.VUE_APP_API_URL}/users/${id}`
    // }
    users: {
        read: `http://localhost:3000/users`,
        add: `http://localhost:3000/users`,
        delete: `http://localhost:3000/users`,
        update: (id) => `http://localhost:3000/users/${id}`,
        findById: (id) => `http://localhost:3000/users/${id}`
    }
};
