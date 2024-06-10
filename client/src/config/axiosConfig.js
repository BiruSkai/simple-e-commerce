import axios from "axios";


const apiAxios =  axios.create({
        baseURL: "/api",
        witchCredentials: true 
})
 
export default apiAxios ;