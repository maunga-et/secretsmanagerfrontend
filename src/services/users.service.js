import {axiosInstance} from "../axios-instance";


class UsersService {
    create(data) {
        return axiosInstance.post('accounts/users/', data)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UsersService();