import React, { useState, useEffect } from 'react'
import '../App.css'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Header = ({ }) => {
    return (
        <div className="row">
            <h4 className="col s5 center"><u>Cachetones</u></h4>
        </div>
    );
}
export default Header;
