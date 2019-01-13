import React, {Component} from 'react'

class SearchBar extends Component {
    render(){
        return(
            <div class="input-group input-group-lg">
                <input type="text" class="form-control" placeholder="Search..."/>
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button"><i class="fa fa-search"></i> Search</button>
                </span>
            </div>
        );
    } 
    
}

export default SearchBar