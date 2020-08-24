import React, {Component} from 'react';
import '../css/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Search from './Search';
import Navbar from './Navbar';
import Collection from './Collection';
import Account from './Account'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <BrowserRouter>
          <Switch>
            <Route path={ '/signup' } component={ Signup } />
            <Route path={ '/login' } component={ Login } />
            <Route path={ '/search' } component={ Search } />
            <Route path={ '/collection' } component={ Collection } />
            <Route path={ '/account' } component={ Account } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
