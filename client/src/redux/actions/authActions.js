import { SIGN_UP, LOG_IN } from '../constants/auth';
import Axios from './Axios/Axios';
// import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthJWT from './Axios/setAuthJWT';

export const signup = (user) => dispatch => {
    console.log(user);

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    }
    
    Axios.post('/api/user/register', user, axiosConfig)
    .then(resp => {
        console.log(resp);
        dispatch({
            type: SIGN_UP,
            payload: resp
        })
    })
    .catch(err => console.log(JSON.stringify(err)))

}

export const login = () => dispatch => {
    dispatch({
        type: LOG_IN
    })
}