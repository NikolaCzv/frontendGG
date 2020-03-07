import React from 'react'
import { connect } from 'react-redux'
import LoggedInNavbar from './loggedInNavbar'
import WithAuth from './WithAuth'

class MyProfile extends React.Component{
    
    render(){
        console.log(this.props.games.users.user)
        return (
            <div>
                <LoggedInNavbar />
                <h1>My Profile</h1>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        games: state
    }
}

export default connect(mapStateToProps)(WithAuth(MyProfile))