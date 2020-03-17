import history from './history'

const getGames = games => {
    return {
        type: '20_GAMES',
        games
    }
}

const saveGames = games => {
    return {
        type: 'MY_GAMES',
        games
    }
}

const nextUrlAction = (url, pUrl) => {
    return {
        type: 'NEXT',
        url,
        pUrl
    }
}

const previousUrl = (url, nextUrl) => {
    return {
        type: 'PREVIOUS',
        url,
        nextUrl
    }
}

const clicked = game => {
    return {
        type: 'CLICKED',
        game
    }
}

const handlePageUp = () => {
    return {
        type: 'PAGE_UP'
    }
} 

export const fetchAllGames = (pageNum) => {
    return function(dispatch){
        fetch(`https://api.rawg.io/api/games?page=${pageNum}`)
        .then(resp => resp.json())
        .then(data => {
            let games = data.results
            let nextUrl = data.next
            dispatch(nextUrlAction(nextUrl))
            dispatch(getGames(games))
        })
    }
}

export const fetchNextGames = url => {
    return function(dispatch){
        fetch(url)
        .then(resp => resp.json())
        .then(data => {
            let games = data.results
            let nextUrl = data.next
            let pUrl = data.previous
            dispatch(nextUrlAction(nextUrl, pUrl))
            dispatch(getGames(games))
        })
    }
}

export const fetchPreviousGames = url => {
    return function(dispatch){
        fetch(url)
        .then(resp => resp.json())
        .then(data => {
            let games = data.results
            let prev = data.previous
            let nextUrl = data.next
            dispatch(previousUrl(prev, nextUrl))
            dispatch(getGames(games))
        })
    }
}

export const clickedGame = (url, stateClicked) => {
    return function(dispatch){
        fetch(url)
        .then(resp => resp.json())
        .then(data => {
            const clickedGame = data.results.find(game => game.id === stateClicked)
            dispatch(clicked(clickedGame))
            history.push(`/gamePage/${clickedGame.id}`)
        })
    }
}

export const pageUp = () => {
    return function(dispatch){
        dispatch(handlePageUp())
    }
}

export const addGame = game => {
    return function(dispatch){
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: game.name,
                image: game.background_image,
                released_date: game.released,
                gameId: game.id
            })
        }

        fetch('http://localhost:3000/api/v1/games', reqObj)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
    }
}

export const myDataGames = () => {
    return function(dispatch){
        fetch('http://localhost:3000/api/v1/games')
        .then(resp => resp.json())
        .then(data => {
            dispatch(saveGames(data))
        })
    }
}