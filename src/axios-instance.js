import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://sm-backend-api.emmanuelmaunga.dev/api/v1/'
})