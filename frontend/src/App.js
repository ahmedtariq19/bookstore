import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import AllBooks from './all-books'
import SearchResults from './searchResults'
import BookInfo from './bookInfo'

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ AllBooks } />
            <Route path="/books/:search" component={ SearchResults } />
            <Route path="/book/:uid" component={ BookInfo } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;