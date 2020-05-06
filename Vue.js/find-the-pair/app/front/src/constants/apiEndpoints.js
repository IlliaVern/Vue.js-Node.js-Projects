export default {
    girls: {
        read:`${process.env.VUE_APP_API_URL}/girls`,
        add:`${process.env.VUE_APP_API_URL}/girls/add`,
        delete:`${process.env.VUE_APP_API_URL}/girls`,
        update:`${process.env.VUE_APP_API_URL}/girls/edit`,
        findById:(id)=>`${process.env.VUE_APP_API_URL}/girls/edit/${id}`,
    }
};