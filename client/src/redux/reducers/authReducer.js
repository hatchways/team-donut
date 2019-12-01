var initialState = {
    name: '',
    email: '',
    password: '',
    message: '',
    user_id: null
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
            updated.email = action.payload.email
            console.log(updated)
            return updated;

        case "LOG_IN_CHECK":
            updated.user_id = action.payload.id
            updated.email = action.payload.email
            return updated;

        default:
            return updated;
    }
}