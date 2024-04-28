import {axiosInstance} from "../axios-instance";

class AuthenticationService {
    login(data) {
        return axiosInstance.post('accounts/token/', data)
    }
}

export default new AuthenticationService();