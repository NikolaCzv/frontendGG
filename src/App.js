import React from 'react';
import {Router, Route} from 'react-router-dom'
import './App.css';
import history from './actions/history'
import homepage from './components/homepage'
import login from './components/login'
import gamePage from './components/gamePage'
import signup from './components/signup'
import myProfile from './components/myProfile'

class App extends React.Component {

  render(){
    return (
      <div>
        <Router history={history}>
          <Route exact path='/' component={homepage} />
          <Route exact path='/login' component={login}/>
          <Route exact path={`/gamePage/:id`} component={gamePage} /> 
          <Route exact path='/signup' component={signup} />
          <Route exact path='/myProfile' component={myProfile} />
        </Router>
      </div>
    );
  }
}

export default App;
