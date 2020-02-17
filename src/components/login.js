import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from '../logo.png'

class Login extends React.Component{
    render(){
        return <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Image src={logo}/>
          <Header as='h2' color='red' textAlign='center'>
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
    
              <Button color='red' fluid size='large'>
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

export default Login