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
    
    Axios.post('/user/register', newuser, axiosConfig)
    .then(resp => {
        console.log(resp)
        
        // const { token } = resp.data.data
        // setAuthJWT(token)
        
        // let decoded = jwt_decode(token);
        // let userID = decoded.user.id;
        // let msg;
        // console.log(userID);

        setTimeout(() => {
            window.location.href = "/"
        }, 1000)       
            
        dispatch({
            type: "SIGN_UP",
            payload: resp.data
        })
    })
    .catch(err => {      
        console.log(JSON.stringify(err))
    })

}

export const login = (user) => dispatch => {
    if(user !== undefined) {
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
    
            const decoded = jwt_decode(token)
            
            const tokenInStorage = localStorage.getItem('token');
            if(tokenInStorage) {
                window.location.href = "/myprofile"
            }
      
            dispatch({
                type: "LOG_IN",
                payload: decoded
            })     
        })
        .catch(err => console.log(JSON.stringify(err)))
    }
}

export const checkIfUserLoggedIn = () => dispatch => {
    const token = localStorage.getItem('token')
    const decoded = jwt_decode(token)

    dispatch({
        type: "LOG_IN_CHECK",
        payload: decoded
    })
}

export const logout = () => {
    localStorage.removeItem('token')
    setAuthJWT(null)
    window.location.href = "/"
}