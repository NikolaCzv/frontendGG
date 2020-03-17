import React from 'react'
import { connect } from 'react-redux'
import Navbar from './navbar'
import { Image, Grid, Item, Dimmer, Loader, Divider, Form, TextArea, Button} from 'semantic-ui-react'
import { clickedGame, fetchAllGames, addGame, myDataGames } from '../actions/games'
import { checkUser } from '../actions/users'
import { addReview } from '../actions/reviews'
import LoggedInNavbar from './loggedInNavbar'

class GamePage extends React.Component{


    constructor(){
        super()

        this.state = {
            loading: true,
            content: ''
        }
    }

    componentDidMount(){
        if (!this.props.games.games.clickedGame.id) {
            this.props.fetchAllGames(this.props.games.games.pageNum)
            this.props.clickedGame(`https://api.rawg.io/api/games?page=${this.props.games.games.pageNum}`, parseInt(this.props.match.params.id))
            this.props.myDataGames()
            this.props.addGame(this.props.games.games.clickedGame)
        }

        if(!localStorage.getItem('token')){
            this.props.fetchAllGames(this.props.games.games.pageNum)
            this.props.myDataGames()
            this.props.addGame(this.props.games.games.clickedGame)
        } else {
            this.props.fetchAllGames(this.props.games.games.pageNum)
            this.props.checkUser(localStorage.getItem('token'))
            this.props.myDataGames()
            this.props.addGame(this.props.games.games.clickedGame)
        }
    }

    componentDidUpdate(prevProps, prevState){
            if(this.props.games.games.clickedGame.id && prevState.loading){
                this.setState({
                    loading: false
                })
            }

            if(!prevProps.games.games.clickedGame.id && this.props.games.games.clickedGame.id){
                this.props.fetchAllGames(this.props.games.games.pageNum)
                this.props.clickedGame(`https://api.rawg.io/api/games?page=${this.props.games.games.pageNum}`, parseInt(this.props.match.params.id))
                this.props.myDataGames()
                this.props.addGame(this.props.games.games.clickedGame)
            }
    }

    handleFavorite = () => {
        console.log('favorite game')
    }

    handleChange = event => {
        this.setState({
            content: event.target.value
        }) 
    }

    handleReview = (event) => {
        event.preventDefault()
        const myGame = this.props.games.games.savedGames.find(game => game.gameId === this.props.games.games.clickedGame.id)
        this.props.addReview(this.state, myGame, this.props.games.users.user)
    }

    handleBackBtn = () => {
        this.props.history.push('/')
    }

    render(){
        const styles = {
            'width': '100%',
            'height': '800px',
        }
        if (this.state.loading){
            return (
            <div>
                <Navbar/>
                <Divider hidden />
                <Dimmer active inverted>
                    <Loader size='big'>Loading</Loader>
                </Dimmer>
            </div>)
        }
        return (
        <div>
            {this.props.games.users.user.id ?
            <LoggedInNavbar/>
            :
            <Navbar/>}
             <div className='showDiv'>
             <Grid>
                <Grid.Column width={4}>
                <Item>

                    <Item.Content>
                        {this.props.games.users.user.id ?
                        null
                        :
                        <div>
                            <Button size='mini' color='black' onClick={this.handleBackBtn}> Back to Homepage </Button>
                            <Divider hidden />
                        </div>

                        }
                        <h1 className='gameText'>{this.props.games.games.clickedGame.name}</h1>
                        <Item.Meta className='gameText'>Realised Date: {this.props.games.games.clickedGame.released}</Item.Meta>
                        <Divider hidden />

                        <Button size='mini' color='green' onClick={this.handleFavorite}> Add to Favorite </Button>
                        <Item.Description>
                        </Item.Description>
                            <Divider hidden />
                            {this.props.games.users.user.id ? 
                            <Form onSubmit={this.handleReview}>
                                <h3 className='gameText' >Review</h3>
                                <Form.Field
                                    control={TextArea}
                                    placeholder='Write The Review Here...'
                                    onChange={this.handleChange}
                                    />
                                <Button type='submit' color='twitter' fluid size='mini'>Add Review</Button>
                            </Form> 
                            :
                            null
                            }
                    </Item.Content>
                </Item>
                </Grid.Column>
                <Grid.Column width={12}>
                <Image src={this.props.games.games.clickedGame.background_image} style={styles}/>
                </Grid.Column>
            </Grid>
             </div>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        games: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clickedGame: (url, stateClicked) => {dispatch(clickedGame(url, stateClicked))},
        fetchAllGames: (pageNum) => {dispatch(fetchAllGames(pageNum))},
        checkUser: token => dispatch(checkUser(token)),
        addGame: game => dispatch(addGame(game)),
        addReview: (review, game, user) => dispatch(addReview(review, game, user)),
        myDataGames: () => dispatch(myDataGames())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)