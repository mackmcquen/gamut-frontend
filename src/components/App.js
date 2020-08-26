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
        <BrowserRouter>
          <Switch>
            <Route path={ '/signup' } component={ Signup } />
            <Route path={ '/' } component={ Login } />
            <Route path={ '/search' }>
              <Navbar />
              <Search />
            </Route>
            <Route path={ '/collection' }>
              <Navbar />
              <Collection />
            </Route>
            <Route path={ '/account' }>
              <Navbar />
              <Account />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
