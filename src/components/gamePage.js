import React from 'react'
import { connect } from 'react-redux'
import Navbar from './navbar'
import { Image, Grid, Item, Dimmer, Loader, Divider, Form, TextArea, Button} from 'semantic-ui-react'
import { clickedGame, fetchAllGames, addGame } from '../actions/games'
import { checkUser } from '../actions/users'
import { addReview } from '../actions/reviews'
import LoggedInNavbar from './loggedInNavbar'

class GamePage extends React.Component{

    // MAKE ADD REVIEW WORK 

    constructor(){
        super()

        this.state = {
            loading: true,
            content: ''
            // game_id: this.props.games.games.clickedGame.id,
            // user_id: this.props.games.users.user.id
        }
    }

    componentDidMount(){
        if (!this.props.games.games.clickedGame.id) {
            this.props.fetchAllGames(this.props.games.games.pageNum)
            this.props.clickedGame(`https://api.rawg.io/api/games?page=${this.props.games.games.pageNum}`, parseInt(this.props.match.params.id))
        }

        if(!localStorage.getItem('token')){
            this.props.fetchAllGames(this.props.games.games.pageNum)
        } else {
            this.props.fetchAllGames(this.props.games.games.pageNum)
            this.props.checkUser(localStorage.getItem('token'))
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
        this.props.addGame(this.props.games.games.clickedGame)
        this.props.addReview(this.state)
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
                        <h1 className='gameText'>{this.props.games.games.clickedGame.name}</h1>
                        <Item.Meta className='gameText'>Realised Date: {this.props.games.games.clickedGame.released}</Item.Meta>
                        <Divider hidden />

                        <Button size='mini' color='green' onClick={this.handleFavorite}> Add to Favorite </Button>
                        <Item.Description>
                        </Item.Description>
                            <Divider hidden />
                            <Form onSubmit={this.handleReview}>
                                <h3 className='gameText' >Review</h3>
                                <Form.Field
                                    control={TextArea}
                                    placeholder='Write The Review Here...'
                                    onChange={this.handleChange}
                                    />
                                <Button type='submit' color='twitter' fluid size='mini'>Add Review</Button>
                            </Form>
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
        addReview: review => dispatch(addReview(review))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)