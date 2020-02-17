import React from 'react'
import { Menu } from 'semantic-ui-react'
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
                    <img src={logo} />
                </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item
                name='login'
                onClick={this.handleLogin}
              />
            </Menu.Menu>
          </Menu>
          )
    }
}

export default Navbar