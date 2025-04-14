import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})


export const adminaxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/',
    header: {
        'Content-Type': 'application/json'
    }
})