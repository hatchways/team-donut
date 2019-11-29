import Axios from './Axios/Axios';
import jwt_decode from 'jwt-decode';
import setAuthJWT from './Axios/setAuthJWT';

export const signup = (newuser) => dispatch => {

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    }
    
    Axios.post('/api/user/register', newuser, axiosConfig)
    .then(resp => {
        const { token } = resp.data.data
        setAuthJWT(token)
        
        let decoded = jwt_decode(token);
        let userID = decoded.user.id;
        let msg;
        console.log(userID);

        window.location.href = "/"      
            
        dispatch({
            type: "SIGN_UP",
            payload: resp.data.data,
            message: msg
        })
    })
    .catch(err => {
        console.log(err);      
        console.log(JSON.stringify(err))
    })

}

export const login = (user) => dispatch => {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    }

    Axios.post('/user/login', user, axiosConfig)
    .then(response => {      
        const { token } = response.data
        setAuthJWT(token)
        localStorage.setItem('token', token)

        const tokenInStorage = localStorage.getItem('token');
        if(tokenInStorage) {
            window.location.href = "/myprofile"
        }
  
        dispatch({
            type: "LOG_IN",
            payload: response.data
        })     
    })
    .catch(err => console.log(JSON.stringify(err)))
}

export const logout = () => dispatch => {
    localStorage.removeItem('token')
    setAuthJWT(null)

    dispatch({
        type: "LOG_OUT"
    })
    window.location.href = "/"
}