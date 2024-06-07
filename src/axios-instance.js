import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://maita-bd9b5ef74491.herokuapp.com/api/v1/'
})
