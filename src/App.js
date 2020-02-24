import React from 'react';
import {Router, Route} from 'react-router-dom'
import './App.css';
import history from './actions/history'
import homepage from './components/homepage'
import login from './components/login'
import gamePage from './components/gamePage'

class App extends React.Component {

  render(){
    return (
      <div>
        <Router history={history}>
          <Route exact path='/' component={homepage} />
          <Route exact path='/login' component={login}/>
          <Route exact path={`/gamePage/:id`} component={gamePage} /> 
        </Router>
      </div>
    );
  }
}

export default App;
