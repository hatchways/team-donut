var initialState = {
    photos: []
}

export default (state = initialState, action) => {
    let updated = Object.assign({}, state);

    switch(action.type) {
        case "USER":
            console.log(action.payload);          
            return updated;
    }
} 