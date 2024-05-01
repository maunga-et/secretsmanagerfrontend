import {axiosInstance} from "../axios-instance";

class SecretsService {
    create(data, token) {
        return axiosInstance.post('secrets/secret/', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    delete(secretId, token) {
        return axiosInstance.delete(`secrets/secret/${secretId}/delete/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    getAllByUserId(token) {
        return axiosInstance.get(`secrets/secret/list/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new SecretsService();