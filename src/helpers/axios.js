import axios from 'axios'
import { url } from './urlConfig';

const axiosInstance = {
    baseURL: url
}

let instance = axios.create(axiosInstance)

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
})
  
export default instance
