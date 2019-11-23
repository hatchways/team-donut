import Axios from './Axios/Axios';
import jwt_decode from 'jwt-decode';

var timeStr = ''

export const timeApi = time => dispatch => {
    timeStr = time
}

export const fundApi = (user) => dispatch => {   
    let timeArray = timeStr.toString().split(' ')
    let timeResult = timeArray.slice(4, timeArray.length).join(' ');
    
    const token = localStorage.getItem('token')
    const decoded = jwt_decode(token)

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    }

    let dateStr = `${user.dateToISOStr} ${timeResult}`
    let d = new Date(dateStr)
    let dateInISO = d.toISOString()

    let newObj = {
        id: decoded.user.id,
        deadline: dateInISO,
        obj: user
    }    

    Axios.post(`/fund/create/${newObj.id}`, newObj, axiosConfig)
    .then(resp => {
        console.log(resp); 
        dispatch({
            type: "USER",
            payload: resp
        })     
    })
    .catch(err => console.log(JSON.stringify(err))) 
}

export const getFundInfo = () => dispatch => {
    const token = localStorage.getItem('token')
    const decoded = jwt_decode(token)

    Axios.get(`/fund/fundinfo/${decoded.user.id}`)
    .then(funds => {
        dispatch({
            type: "FUNDS",
            payload: funds.data
        })
    })
    .catch(err => console.log(JSON.stringify(err)))
}