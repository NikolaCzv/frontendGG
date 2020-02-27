import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from '../logo.png'
import { login } from '../actions/users'
import { connect } from 'react-redux'

class Login extends React.Component{

  state = {
    username: '',
    password: ''
  }

  handleImage = () => {
    this.props.history.push('/')
  }

  handleLogin = (event) => {
    event.preventDefault()
    this.props.login(this.state)
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

    render(){
        return <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Image src={logo} onClick={this.handleImage}/>
          <Header as='h2' color='blue' textAlign='center'>
            Log in to your account
          </Header>
          <Form size='large' onSubmit={this.handleLogin}>
            <Segment stacked>
              <Form.Input 
                fluid icon='user'
                iconPosition='left'
                placeholder='Username'
                name='username'
                onChange={(event) => this.handleInputChange(event)}
                />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='password'
                onChange={(event) => this.handleInputChange(event)}
              />
    
              <Button color='twitter' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href='/signup'>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    }
    
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => {dispatch(login(user))}
  }
}

export default connect(null, mapDispatchToProps)(Login)