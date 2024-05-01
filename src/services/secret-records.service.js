import {axiosInstance} from "../axios-instance";

class SecretRecordsService {
    create(data, token) {
        return axiosInstance.post('secrets/secret-record/', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    delete(recordId, token) {
        return axiosInstance.delete(`secrets/secret-record/${recordId}/delete/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    getAllBySecretId(secretId, token) {
        return axiosInstance.get(`secrets/secret-record/${secretId}/list/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new SecretRecordsService();