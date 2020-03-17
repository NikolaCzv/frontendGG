import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import logo from '../logo.png'
import history from '../actions/history'

class Navbar extends React.Component {

    handleLogin = () => {
        history.push('/login')
    }
    

    render(){
        return (
            <Menu pointing secondary>
                <Menu.Item>
                    <img src={logo} alt='' />
                </Menu.Item>
            <Menu.Menu position='right'>
              <Button color='twitter' onClick={this.handleLogin} size='mini'>Login</Button>
            </Menu.Menu>
          </Menu>
          )
    }
}

export default Navbar