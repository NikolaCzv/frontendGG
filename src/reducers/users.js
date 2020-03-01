const initialState = {
    user: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'USER_LOGIN':
            return {...state, user: action.user}
        case 'LOG_OUT':
            return{...state, user: initialState}
        default:
            return state
    }
}