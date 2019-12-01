import Axios from './Axios/Axios';

export const allUsers = () => dispatch => {
    Axios.get('/user/allusers')
    .then(result => {
        dispatch({
            type: 'ALL_USERS',
            payload: result.data
        })
    })
    .catch(err => JSON.stringify(err))
}

export const user = (id) => dispatch => {
    Axios.get('/user/allusers')
    .then(result => {
        dispatch({
            type: 'USER',
            payload: result.data,
            id
        })
    })
    .catch(err => JSON.stringify(err))
}