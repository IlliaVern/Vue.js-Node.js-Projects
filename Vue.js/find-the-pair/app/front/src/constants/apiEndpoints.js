export default {
    girls: {
        read:`${process.env.VUE_APP_API_URL}/girls`,
        add:`${process.env.VUE_APP_API_URL}/girls/add`,
        delete:`${process.env.VUE_APP_API_URL}/girls`,
        update:(id)=>`${process.env.VUE_APP_API_URL}/girls/edit/${id}`,
        findById:(id)=>`${process.env.VUE_APP_API_URL}/girls/edit/${id}`,
    },

    user: {
        signup:`${process.env.VUE_APP_API_URL}/users/signup`,
        login:`${process.env.VUE_APP_API_URL}/users/login`,
    }
};