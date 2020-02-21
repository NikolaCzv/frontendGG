import React from 'react'
import { connect } from 'react-redux'

class GamePage extends React.Component{

    render(){
        console.log(this.props.games.games.clickedGame.name)
        return <h1>Game PAGEEEE</h1>
    }
}

const mapStateToProps = state => {
    return {
        games: state
    }
}

export default connect(mapStateToProps)(GamePage)