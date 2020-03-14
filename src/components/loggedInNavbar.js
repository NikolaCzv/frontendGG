import React from 'react'
import logo from '../logo.png'
import {Menu, Button} from 'semantic-ui-react'
import history from '../actions/history'
import { connect } from 'react-redux'
import { logout } from '../actions/users'

class LoggedInNavbar extends React.Component {

    handleLogout = () => {
        history.push('/')
        localStorage.clear()
        this.props.logout()
        alert('You are successfuly logged out!')
    }

    handleHome = () => {
        history.push('/')
    }

    handleMyProfile = () => {
        history.push('/myProfile')
    }

    render(){
        return (
            <Menu pointing secondary>
                <Menu.Item>
                    <img src={logo} alt='' />
                </Menu.Item>
                <Menu.Item
                name='myProfile'
                onClick={this.handleMyProfile}
                />
                <Menu.Item
                name='homepage'
                onClick={this.handleHome}
                />
                <Menu.Item
                name='dashboard'
                onClick={this.handleDash}
                />
                <Menu.Item
                name='findFriends'
                onClick={this.handleFriends}
                />
            <Menu.Menu position='right'>
              <Button color='red' onClick={this.handleLogout} size='mini'>Log out</Button>
            </Menu.Menu>
          </Menu>
          )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {dispatch(logout())}
    }
}

export default connect(null, mapDispatchToProps)(LoggedInNavbar)