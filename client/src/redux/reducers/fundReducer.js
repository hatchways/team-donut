var initialState = {
    funds: []
}

export default (state = initialState, action) => {
    let updated = Object.assign({}, state);

    switch(action.type) {
        case "FUNDS":
            updated.funds = action.payload.funds
            return updated;

        default:
            return updated;
    }
} 