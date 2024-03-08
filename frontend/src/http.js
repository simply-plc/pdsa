import axios from 'axios';

const http = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    // baseURL: 'https://backend-service-rksdw44qea-wl.a.run.app/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        common: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
        }
    }
});

export default http;