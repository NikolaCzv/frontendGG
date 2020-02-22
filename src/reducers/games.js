const initialState = {
    gamesPage: [],
    nextUrl: '',
    previousUrl: '',
    clickedGame: [],
    pageNum: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case '20_GAMES':
            return {...state, gamesPage: action.games}
        case 'NEXT':
            return {...state, nextUrl: action.url, previousUrl: action.pUrl, pageNum: state.pageNum + 1}
        case 'PREVIOUS':
            return {...state, previousUrl: action.url, nextUrl: action.nextUrl, pageNum: state.pageNum - 1}
        case 'CLICKED':
            return {...state, clickedGame: action.game}
        default:
            return state
    }
}