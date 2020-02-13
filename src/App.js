import React from 'react';
import {Router, Route} from 'react-router-dom'
import './App.css';
import history from './actions/history'
import homepage from './components/homepage'

class App extends React.Component {

  render(){
    return (
      <div>
        <Router history={history}>
          <Route exact path='/' component={homepage}/>
        </Router>
      </div>
    );
  }
}

export default App;
