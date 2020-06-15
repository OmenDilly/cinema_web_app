const initState = {
    places: []
}

const placeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('Hall created', action.place);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('Hall create error', action.err);
            return state;
        default:
            return state;
    }
}

export default placeReducer