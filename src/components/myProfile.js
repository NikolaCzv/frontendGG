import React from 'react'
import { connect } from 'react-redux'
import LoggedInNavbar from './loggedInNavbar'

class MyProfile extends React.Component{
    
    render(){
        console.log(this.props.games.users.user)
        return (
            <div>
                <LoggedInNavbar />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        games: state
    }
}

export default connect(mapStateToProps)(MyProfile)