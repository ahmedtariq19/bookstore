import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import AllBooks from './all-books'

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ AllBooks }/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
