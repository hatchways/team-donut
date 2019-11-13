import { SIGN_UP, LOG_IN } from '../constants/auth';

var initialState = {
    name: '',
    email: '',
    password: ''
}

export default (state = initialState, action) => {
    let updated = Object.assign({}, state)

    switch(action.type) {
        case SIGN_UP:
            console.log(action)
            return updated;

        case LOG_IN: 
            return updated;

        default:
            return updated;
    }
}