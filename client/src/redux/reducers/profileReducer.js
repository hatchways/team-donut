var initialState = {
    allUsers: []
}

export default (state = initialState, action) => {
    let updated = Object.assign({}, state);

    switch(action.type) {
        case 'ALL_USERS':                  
            updated.allUsers = action.payload
            return updated;

        case 'USER':
            let user = action.payload.filter(item => {
                return action.id === item._id ? item : ''
            })                    
            updated.allUsers = user
            return updated;

        default:
            return updated
    }
}