import React from "react"
import {MdSearch} from 'react-icons/md'
const Search = ({handleSearchNote})=>{
    return(
        <div className="search">
            <MdSearch className='search-icons' size='1.3rem'></MdSearch>
            <input type='text' onChange={(event)=>handleSearchNote(event.target.value)}placeholder="Search for a note..."></input>
        </div>
    )
}
export default Search;