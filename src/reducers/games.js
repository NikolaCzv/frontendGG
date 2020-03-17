const initialState = {
    gamesPage: [],
    nextUrl: '',
    previousUrl: '',
    clickedGame: [],
    pageNum: 1,
    savedGames: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case '20_GAMES':
            return {...state, gamesPage: action.games}
        case 'NEXT':
            if(action.pUrl === undefined) {
                return {...state, nextUrl: action.url}
            } else {
                return {...state, nextUrl: action.url, previousUrl: action.pUrl}
            }
        case 'PREVIOUS':
            return {...state, previousUrl: action.url, nextUrl: action.nextUrl, pageNum: state.pageNum - 1}
        case 'CLICKED':
            return {...state, clickedGame: action.game}
        case 'PAGE_UP':
            return {...state, pageNum: state.pageNum + 1}
        case 'MY_GAMES':
            return {...state, savedGames: action.games}
        default:
            return state
    }
}