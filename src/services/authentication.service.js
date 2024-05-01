import {axiosInstance} from "../axios-instance";

class AuthenticationService {
    login(data) {
        return axiosInstance.post('accounts/token/', data)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthenticationService();