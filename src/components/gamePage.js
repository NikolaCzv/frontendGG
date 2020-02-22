import React from 'react'
import { connect } from 'react-redux'
import Navbar from './navbar'
import { Image, Grid, Item} from 'semantic-ui-react'
import { clickedGame } from '../actions/games'

class GamePage extends React.Component{

    constructor(){
        super()

        this.state = {
            loading: true,
        }
    }

    componentDidMount(){
        if (!this.props.games.games.clickedGame.id) {
            this.props.clickedGame()
        }
    }


    render(){
        const styles = {
            'width': '100%',
            'height': '800px',
        }

        return (
        <div>
                    <Navbar />
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

const dispatchStateToProps = dispatch => {
    return {
        clickedGame: (url, stateClicked) => {dispatch(clickedGame(url, stateClicked))}
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(GamePage)