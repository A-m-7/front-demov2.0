import Cookies from "js-cookie";
import axios from "axios";


const create_axios_instance = () => {
    const axiosApiInstance = axios.create();
    axiosApiInstance.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get("accessToken")}`
    return axiosApiInstance
}


export { create_axios_instance, }