import Axios from './Axios/Axios';
import jwt_decode from 'jwt-decode';

export const photoApi = (photos) => dispatch => {
    console.log(photos);

    const token = localStorage.getItem('token')
    const decoded = jwt_decode(token)
    console.log(decoded);

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    }

    let picObj = {
        id: decoded.user.id,
        picArr: photos
    }

    Axios.post('/api/fund/create', picObj, axiosConfig)
    .then(resp => {
        console.log(resp); 
        dispatch({
            type: "PICS",
            payload: photos
        })     
    })
    .catch(err => console.log(JSON.stringify(err))) 
}