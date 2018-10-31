import axios from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST;

let settings = {
    baseURL: API_HOST
};

if (localStorage.getItem('auth_token')) {
    settings = {
        baseURL: API_HOST,
        headers: { Authorization: localStorage.getItem('auth_token') }
    };
}

export const axiosInstance = axios.create(settings);
