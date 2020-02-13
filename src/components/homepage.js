import React from 'react'
import { getGames, nextUrl, previousUrl } from '../actions/games'
import { connect } from 'react-redux'

class Homepage extends React.Component{

    state = {
        page: undefined
    }

    componentDidMount(){
        fetch('https://api.rawg.io/api/games?page=1')
        .then(resp => resp.json())
        .then(data => {
            let games = data.results
            let nextUrl = data.next
            this.props.nextUrl(nextUrl)
            this.props.getGames(games)
        })
    }

    nextGames = () => {
        fetch(this.props.games.games.nextUrl)
        .then(resp => resp.json())
        .then(data => {
            let games = data.results
            let nextUrl = data.next
            let pUrl = data.previous
            this.props.nextUrl(nextUrl, pUrl)
            this.props.getGames(games)
        })
        this.setState({
            page: undefined
        })
    }

    previousGames = () => {
        fetch(this.props.games.games.previousUrl)
        .then(resp => resp.json())
        .then(data => {
            let games = data.results
            let prev = data.previous
            let nextUrl = data.next
            this.props.previousUrl(prev, nextUrl)
            this.props.getGames(games)
        })
        this.setState({
            page: undefined
        })
    }

    handleNextBtn = () => {
        this.setState({
            page: true
        })

        this.nextGames()
    }

    handlePreviousBtn = () => {
        this.setState({
            page: true
        })

        this.previousGames()
    }

    renderGames = () => {
        return this.props.games.games.gamesPage.map((game, index) => {
            return <h3 key={index} >{game.name}</h3>
        })
    }


    render(){
        return<div>
                <h1>Home Page</h1>
                {this.state.page ? 
                this.nextGames()
                 :
                this.renderGames()}
                <button onClick={this.handlePreviousBtn}>Previous</button>
                <button onClick={this.handleNextBtn}>Next</button>
            </div>
    }
}

const mapStateToProps = state => {
    return {
        games: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGames: games => {dispatch(getGames(games))},
        nextUrl: (url, pUrl) => {dispatch(nextUrl(url, pUrl))},
        previousUrl: (url, nextUrl) => dispatch(previousUrl(url, nextUrl))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)