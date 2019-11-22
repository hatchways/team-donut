var initialState = {
    name: '',
    email: '',
    message: ''
}

export default (state = initialState, action) => {
    let updated = Object.assign({}, state)

    switch(action.type) {
        case "SIGN_UP":
            let { name, email } = action.payload
            updated.name = name
            updated.email = email
            updated.message = action.message
            return updated;

        case "LOG_IN": 
            // let { name, email } = action.payload
            // updated.name = name
            console.log(action.payload);
            
            updated.email = action.payload.email
            return updated;

        default:
            return updated;
    }
}