import React from 'react'
import { fetchAllGames, fetchNextGames, fetchPreviousGames, clickedGame } from '../actions/games'
import { connect } from 'react-redux'
import Navbar from './navbar'
import { Grid, Divider, Image, List } from 'semantic-ui-react'
import logo from '../logo.png'

class Homepage extends React.Component{
    //next step is to make new show page component for clicked game
    //fix the redux store infinite loop 'clicked'

    state = {
        page: undefined,
        clicked: undefined,
        pageNumber: 1
    }

    componentDidMount(){
        this.props.fetchAllGames()
    }

    nextGames = () => {
        this.props.fetchNextGames(this.props.games.games.nextUrl)
        this.setState({
            page: undefined
        })
    }

    previousGames = () => {
        this.props.fetchPreviousGames(this.props.games.games.previousUrl)
        this.setState({
            page: undefined
        })
    }

    handleNextBtn = () => {
        this.setState({
            page: true,
            clicked: undefined,
            pageNumber: this.state.pageNumber + 1
        })

        this.nextGames()
    }

    handlePreviousBtn = () => {
        if(this.state.pageNumber === 1){
            alert("There is no previuos page! Please try with 'next' button.")
        } else {
        this.setState({
            page: true,
            clicked: undefined,
            pageNumber: this.state.pageNumber - 1
        })
        this.previousGames()
        }
    }

    handleShowGame = (gameId) => {
        this.setState({
            clicked: gameId
        })
    }

    showGame = (game) => {
        if(this.state.pageNumber === 1){
            this.props.clickedGame('https://api.rawg.io/api/games?page=1', this.state.clicked)
            return <div>{game.name}</div>
        } else {
            this.props.clickedGame(`https://api.rawg.io/api/games?page=${this.state.pageNumber}`, this.state.clicked)
        return <div>{game.name}</div>
        }
    }

    renderGames = () => {
        return this.props.games.games.gamesPage.map((game, index) => {
            return<List.Item key={index} onClick={() => this.handleShowGame(game.id)}>
                    <Image avatar src={logo} />
                    <List.Content>
                         <List.Header>{game.name}</List.Header>
                    </List.Content>
                </List.Item>
        })
    }


    render(){
        return<div>
            <Navbar/>
                {this.state.page ? 
                <Grid columns={2} >
                     <Grid.Column>
                        <List animated verticalAlign='middle'>
                            {this.nextGames()}
                        </List>
                    </Grid.Column>
                    <Grid.Column>
                    {this.state.clicked ?
                        this.showGame(this.props.games.games.clickedGame)
                        :
                        <div>No game clicked</div>}
                    </Grid.Column>
                </Grid>
                 :
                 <Grid columns={2} >
                    <Grid.Column>
                        <List animated verticalAlign='middle'>
                            {this.renderGames()}
                        </List>
                     </Grid.Column>
                     <Grid.Column>
                     {this.state.clicked ?
                        this.showGame(this.props.games.games.clickedGame)
                        :
                        <div>No game clicked</div>}
                     </Grid.Column>
                </Grid>}
                <Divider hidden />
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
        fetchAllGames: () => dispatch(fetchAllGames()),
        fetchNextGames: url => dispatch(fetchNextGames(url)),
        fetchPreviousGames: url => dispatch(fetchPreviousGames(url)),
        clickedGame: (url, stateClicked) => dispatch(clickedGame(url, stateClicked))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)