import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL:"https://authentication-backend-r9vz.onrender.com/" ,
    headers: {
        'Content-Type': 'application/json'
    }
});


axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// http://localhost:3001