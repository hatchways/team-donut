import Axios from './Axios/Axios';
import jwt_decode from 'jwt-decode';

export const fundApi = (user) => dispatch => {
    console.log(user);
    
    const token = localStorage.getItem('token')
    const decoded = jwt_decode(token)

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    }

    let newObj = {
        id: decoded.user.id,
        obj: user
    }

    Axios.post(`/fund/create/${newObj.id}`, newObj, axiosConfig)
    .then(resp => {
        console.log(resp); 
        dispatch({
            type: "USER",
            payload: user
        })     
    })
    .catch(err => console.log(JSON.stringify(err))) 
}