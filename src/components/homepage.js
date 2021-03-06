import React from 'react'
import { fetchAllGames, fetchNextGames, fetchPreviousGames, clickedGame, pageUp, myDataGames } from '../actions/games'
import { connect } from 'react-redux'
import Navbar from './navbar'
import { Grid, Divider, Image, Button, Card } from 'semantic-ui-react'
import LoggedInNavbar from './loggedInNavbar'
import { login, checkUser } from '../actions/users'

class Homepage extends React.Component{

    //next steps: fix refresh on homepage, find friends, follow, render reviews

    state = {
        page: undefined,
        clicked: undefined
    }

    componentDidMount(){
        if(!localStorage.getItem('token')){
            this.props.fetchAllGames(this.props.games.games.pageNum)
            this.props.myDataGames()
        } else {
            this.props.fetchAllGames(this.props.games.games.pageNum)
            this.props.checkUser(localStorage.getItem('token'))
            this.props.myDataGames()
        }
    }

    componentDidUpdate(prevProps){
        if(!prevProps.games.users.user.id && this.props.games.users.user.id){
            this.props.fetchAllGames(this.props.games.games.pageNum)
            this.props.myDataGames()
        }
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
        this.props.pageUp()
        document.documentElement.scrollTop = 0;
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
        document.documentElement.scrollTop = 0;
        }
    }

    handleShowGame = (gameId) => {
        this.setState({
            clicked: gameId
        })
    }

    showGame = () => {
            this.props.clickedGame(`https://api.rawg.io/api/games?page=${this.props.games.games.pageNum}`, this.state.clicked)
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
                    <Button onClick={() => this.handleShowGame(game.id)} size='mini' color='black'>View</Button>
                    <Button size='mini' color='red'> Add to Favorite </Button>
                </Card.Content>
              </Card>
              </Grid.Column>
            )
        })
    }


    render(){
        return<div>
            {this.props.games.users.user.id ?
            <LoggedInNavbar/>
            :
            <Navbar/>}
            <div className='home'>
                {this.state.page ? 
                <Grid relaxed columns={4}>
                     <Grid.Column>
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
                {this.props.games.games.pageNum > 1 ? 
                <Button onClick={this.handlePreviousBtn} color='twitter'>Previous</Button>
                :
                null
                }
                <Button onClick={this.handleNextBtn} color='twitter'>Next</Button>
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
        fetchAllGames: (pageNum) => dispatch(fetchAllGames(pageNum)),
        fetchNextGames: url => dispatch(fetchNextGames(url)),
        fetchPreviousGames: url => dispatch(fetchPreviousGames(url)),
        clickedGame: (url, stateClicked) => dispatch(clickedGame(url, stateClicked)),
        pageUp: () => dispatch(pageUp()),
        login: user => dispatch(login(user)),
        checkUser: token => dispatch(checkUser(token)),
        myDataGames: () => dispatch(myDataGames())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)