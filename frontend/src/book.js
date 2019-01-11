import React, { Component } from 'react';
import './book.css'

class Book extends Component {
    constructor(props) {
        super(props)
      }
    render(){
        return(
            <div className="book-container">
                <div className="book-left">
                    <img src={require('.'+this.props.data.thumbnailLink)} height="auto" width="100%"/>
                </div>
                <div className="book-right">
                    <div className="metadata">
                        <h3>{ this.props.data.title }</h3><br/>
                        By<br/>
                        <i><strong>{ this.props.data.metadata.authors[0].name }</strong></i><br/><br/>
                        Price:<br/>
                        <i><strong>${ this.props.data.price }</strong></i>
                    </div>
                    <div className="select-btn">
                        <div className="btn">
                            <button type="button" className="btn btn-primary">Select</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Book