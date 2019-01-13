import React, { Component } from 'react';
import Book from './book'
import axios from 'axios';

class AllBooks extends Component {
    constructor(props) {
        super(props)
        this.state = {books: []}
      }
    componentDidMount(){
        axios.get('http://localhost:3001/books/all-books')
        .then(response => {
            console.log(response)
            this.setState({books:response.data})
        })
        .catch(err => {
            console.log(err)
        })
    }
    render(){
        let books = this.state.books
        let booksList = books.map(book => {
            return (
                <div className="col-sm-6 col-md-4" key={book.uid}>
                    <Book data={ book }/>
                </div>
            )      
        })

        return (
            <div className="books-container">
                <div className="row">
                    { booksList }
                </div>
            </div>
        );
        
    }
}

export default AllBooks