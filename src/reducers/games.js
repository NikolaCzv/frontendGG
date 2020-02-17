const initialState = {
    gamesPage: [],
    nextUrl: '',
    previousUrl: '',
    clickedGame: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case '20_GAMES':
            return {...state, gamesPage: action.games}
        case 'NEXT':
            return {...state, nextUrl: action.url, previousUrl: action.pUrl}
        case 'PREVIOUS':
            return {...state, previousUrl: action.url, nextUrl: action.nextUrl}
        case 'CLICKED':
            return {...state, clickedGame: action.game}
        default:
            return state
    }
}