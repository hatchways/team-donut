import Axios from './Axios/Axios';
import jwt_decode from 'jwt-decode';

var timeStr = ''

export const timeApi = time => dispatch => {
    timeStr = time
}

export const fundApi = (user) => dispatch => { 
    console.log(user);
      
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
        id: decoded.id,
        deadline: dateInISO,
        obj: user
    }    

    Axios.post(`/fund/create/${newObj.id}`, newObj, axiosConfig)
    .then(resp => {
        console.log(resp); 
        dispatch({
            type: "USER",
            payload: resp.data
        })     
    })
    .catch(err => console.log(JSON.stringify(err))) 
}

export const addPhotos = (id, pic) => dispatch => {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    }

    let morePics = { id, pic }

    Axios.post(`/fund/addphotos/${id}`, morePics, axiosConfig)
    .then(result => {  
        dispatch({
            type: "ADD PICS",
            payload: result.data.photo
        })
    })
    .catch(err => {
        console.log(JSON.stringify(err))
    })
}

export const getFundInfo = (id) => dispatch => { 
    Axios.get(`/fund/fundinfo/${id}`)
    .then(funds => {
        dispatch({
            type: "FUNDS",
            payload: funds.data
        })
    })
    .catch(err => console.log(JSON.stringify(err)))
}

export const getFundDetails = (userID, fundID) => dispatch => {   
    Axios.get(`/fund/funddetails/${userID}?fundID=${fundID}`)
    .then(funds => {
        dispatch({
            type: "DETAILS",
            payload: funds.data
        })
    })
    .catch(err => console.log(JSON.stringify(err)))
}

export const handleServerEditApi = (id, currentState) => dispatch => {
    console.log(id, currentState);
    
    const token = localStorage.getItem('token')
    const decoded = jwt_decode(token)

    let update = {
        id, currentState
    }

    Axios.put(`/fund/editfund/${decoded.id}?_method=PUT`, update)
    .then(result => {
        console.log(result)
        dispatch({
            type: "EDIT",
            payload: result.data.description
        })
    })
    .catch(err => {
        console.log(JSON.stringify(err))
    })
}

export const requestToFund = (yourID, theirFundID) => dispatch => {
    let idObj = { theirFundID }

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    }

    Axios.post(`/fund/requestfund/${yourID}`, idObj, axiosConfig)
    .then(result => {
        dispatch({
            type: 'REQUEST',
            payload: result.data
        })
    })
    .catch(err => JSON.stringify(err))
}