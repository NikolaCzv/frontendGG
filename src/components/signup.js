import React from 'react'
import { Grid, Divider, Image, Button, Header, Form } from 'semantic-ui-react'
import logo from '../logo.png'
import {connect} from 'react-redux'
import {signup} from '../actions/users'

class Signup extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    }

    handleBackButton = () => {
        this.props.history.push('/login')
    }

    handleHomePage = () => {
        this.props.history.push('/')
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        }) 
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.signup(this.state)
    }

    render(){
        return(
            <div className='signup'>
            <Grid textAlign='center' >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Image src={logo} size='big' />
                        <Divider hidden />
                        <Header as='h2' color='blue' textAlign='center'>
                            Please sign up
                        </Header>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                            <label>Username</label>
                            <input placeholder='Username'
                            name='username'
                            onChange={this.handleChange}/>
                            </Form.Field>
                            <Form.Field>
                            <label>Email</label>
                            <input
                            onChange={this.handleChange}
                            placeholder='joe@schmoe.com'
                            name='email'
                                error={{
                                    content: 'Please enter a valid email address',
                                    pointing: 'below',
                                        }}/>
                            </Form.Field>
                            <Form.Field>
                            <label>Password</label>
                            <input placeholder='Password' 
                            type='password'
                            name='password'
                            onChange={this.handleChange}
                            />
                            </Form.Field>
                            <Form.Field>
                            <label>Confirm Password</label>
                            <input placeholder='Password Confirmation' 
                            type='password'
                            name='password_confirmation'
                            onChange={this.handleChange}
                            />
                            </Form.Field>
                            
                            <Button type='submit' color='twitter' fluid size='large'>Submit</Button><br></br>
                            <Button onClick={this.handleBackButton} fluid size='large'>Back to Login Page</Button><br></br>
                            <Button onClick={this.handleHomePage} fluid size='large'>Back to Home Page</Button>
                        </Form>
                    </Grid.Column>
            </Grid>
            </div>)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (user) => dispatch(signup(user))
    }
}

export default connect(null, mapDispatchToProps)(Signup)