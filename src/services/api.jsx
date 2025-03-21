import axios from 'axios';
import apiEndpoints from '../contants/ApiEndpoints';
import { message } from 'antd';
import endpoints from '../contants/Endpoint';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: apiEndpoints.baseURL,
    timeout: 10000, // Set a timeout for requests
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add authorization token to headers if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors globally
        if (error.response) {
            
            switch (error.response.status) {
                case 400:
                    message.error('Bad Request: Please check your input and try again.');
                    break;
                case 401:
                    message.error('Unauthorized: Please log in again.');
                    window.location.href = endpoints.auth.login;
                    break;
                case 403:
                    message.error('Forbidden: You do not have permission to perform this action.');
                    break;
                case 404:
                    message.error('Not Found: The requested resource could not be found.');
                    break;
                case 500:
                    message.error('Internal Server Error: Please try again later.');
                    break;
                default:
                    message.error(`Error: ${error.response.statusText}`);
            }
       
        } else {
            message.error('Network Error: Please check your internet connection and try again.');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;