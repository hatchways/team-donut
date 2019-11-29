var initialState = {
    funds: []
}

export default (state = initialState, action) => {
    let updated = Object.assign({}, state);

    switch(action.type) {
        case "FUNDS":
            updated.funds = action.payload.funds
            return updated;

        case "EDIT":
            updated.funds.map(item => {
                item.description = action.payload
            })
            return updated;

        case "ADD PICS":
            action.payload.map(photos => {
                updated.funds.map(item => {
                    item.photo.push(photos)
                })
            })
            return updated;

        case "USER":
            updated.funds.push(action.payload)
            return updated;

        case "DETAILS":
            updated.funds.push(action.payload)           
            return updated;

        default:
            return updated;
    }
} 