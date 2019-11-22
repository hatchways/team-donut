import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:3001',  
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    // timeout: 5000   
    timeout: 3600000 // 1 hour
});

export default Axios;
