import React from 'react'
import { fetchAllGames, fetchNextGames, fetchPreviousGames, clickedGame } from '../actions/games'
import { connect } from 'react-redux'
import Navbar from './navbar'
import { Grid, Divider, Image, Button, Card } from 'semantic-ui-react'

class Homepage extends React.Component{

    //fix next btn, change path and loadiung sign
    //next step game page fix...

    state = {
        page: undefined,
        clicked: undefined
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
        })

        this.nextGames()
    }

    handlePreviousBtn = () => {
        if(this.props.games.games.pageNum === 1){
            alert("There is no previuos page! Please try with 'next' button.")
        } else {
        this.setState({
            page: true,
            clicked: undefined,
        })
        this.previousGames()
        }
    }

    handleShowGame = (gameId) => {
        this.setState({
            clicked: gameId
        })
    }

    showGame = () => {
        if(this.props.games.games.pageNum === 1){
            this.props.clickedGame('https://api.rawg.io/api/games?page=1', this.state.clicked)
        } else {
            this.props.clickedGame(`https://api.rawg.io/api/games?page=${this.props.games.games.pageNum}`, this.state.clicked)
        }
    }

    renderGames = () => {
        return this.props.games.games.gamesPage.map((game, index) => {

            const styles = {
                'width': '100%',
                'height': '250px',
            }

            return (
                <Grid.Column key={index} >
                <Card>
                <Image src={game.background_image} style={styles} />
                <Card.Content>
                    <Card.Header>{game.name}</Card.Header>
                  <Card.Meta>
                    <span className='date'>Released in {game.released}</span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={() => this.handleShowGame(game.id)} >More</Button>
                </Card.Content>
              </Card>
              </Grid.Column>
            )
        })
    }


    render(){
        return<div>
            <Navbar/>
            <div className='home'>
                {this.state.page ? 
                <Grid relaxed columns={4}>
                     <Grid.Column>
                            {this.nextGames()}
                    {this.state.clicked ?
                        this.showGame(this.props.games.games.clickedGame)
                        :
                        <div></div>}
                    </Grid.Column>
                </Grid>
                 :
                 <Grid relaxed columns={4}>
                            {this.renderGames()}
                     {this.state.clicked ?
                        this.showGame(this.props.games.games.clickedGame)
                        :
                        <div></div>}
                </Grid>}
                <Divider hidden />
                <Button onClick={this.handlePreviousBtn}>Previous</Button>
                <Button onClick={this.handleNextBtn}>Next</Button>
                </div>
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