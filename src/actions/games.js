
export const getGames = games => {
    return {
        type: '20_GAMES',
        games
    }
}

export const nextUrl = (url, pUrl) => {
    return {
        type: 'NEXT',
        url,
        pUrl
    }
}

export const previousUrl = (url, nextUrl) => {
    return {
        type: 'PREVIOUS',
        url,
        nextUrl
    }
}