import React from "react";
import {GrNote} from 'react-icons/md'
const Header =({handleToggleDarkMode}) =>{

    return(
        <div className="header">
            <div className='brand-icon'><GrNote size='1em' /></div>
            <h1>Notes</h1>
            <button onClick={()=>handleToggleDarkMode((previousDarkMode) =>!previousDarkMode) } className="toggle">Toggle Mode</button>
        </div>
    )
}
export default Header;