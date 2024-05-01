import {axiosInstance} from "../axios-instance";

class ApiKeysService {
    create(token) {
        return axiosInstance.post('secrets/api-key/', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    get(token) {
        return axiosInstance.get(`secrets/api-key/list/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}


export default new ApiKeysService();