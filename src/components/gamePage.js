import React from 'react'
import { connect } from 'react-redux'
import Navbar from './navbar'
import { Image, Grid, Item, Segment, Dimmer, Loader, Divider} from 'semantic-ui-react'
import { clickedGame, fetchAllGames } from '../actions/games'
import LoggedInNavbar from './loggedInNavbar'

class GamePage extends React.Component{

    constructor(){
        super()

        this.state = {
            loading: true,
        }
    }

    componentDidMount(){
        // debugger
        if (!this.props.games.games.clickedGame.id) {
            this.props.fetchAllGames(this.props.games.games.pageNum)
            this.props.clickedGame(`https://api.rawg.io/api/games?page=${this.props.games.games.pageNum}`, parseInt(this.props.match.params.id))
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
                        <Item.Meta className='gameText'>{this.props.games.games.clickedGame.released}</Item.Meta>
                        <Item.Description>
                        </Item.Description>
                        <Item.Extra>Additional Details</Item.Extra>
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
        fetchAllGames: (pageNum) => {dispatch(fetchAllGames(pageNum))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)