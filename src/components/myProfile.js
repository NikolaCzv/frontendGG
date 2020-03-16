import React from 'react'
import { connect } from 'react-redux'
import LoggedInNavbar from './loggedInNavbar'
import WithAuth from './WithAuth'
import {Grid, Image, Button, Card, Segment, Menu, Input} from 'semantic-ui-react'
import profPicDef from '../profPicDef.png'

class MyProfile extends React.Component{

    state = { activeItem: 'bio' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    render(){
        console.log(this.props.games.users.user)
        const { activeItem } = this.state
        return (
            <div>
                <LoggedInNavbar />
                <Grid>
                    <Grid.Column width={4}>
                        <Card>
                            <Image src={profPicDef} wrapped ui={false} alt='' />
                            <Card.Content>
                                <Card.Header>{this.props.games.users.user.username}</Card.Header>
                            </Card.Content>
                            <Card.Content extra>
                                <Button size='mini'>Edit Profile</Button>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Menu attached='top' tabular>
                        <Menu.Item
                            name='myGames'
                            active={activeItem === 'myGames'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='reviewedGames'
                            active={activeItem === 'reviewedGames'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='followers'
                            active={activeItem === 'followers'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='following'
                            active={activeItem === 'following'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Menu position='right'>
                            <Menu.Item>
                            <Input
                                transparent
                                icon={{ name: 'search', link: true }}
                                placeholder='Search...'
                            />
                            </Menu.Item>
                        </Menu.Menu>
                        </Menu>

                        <Segment attached='bottom'>
                            <img src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                        </Segment>
                    </Grid.Column>
                </Grid>
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