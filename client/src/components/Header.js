import React, { useState, useEffect } from 'react'
import '../App.css'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Header = ({ subject, storefront }) => {


    return (
        <div className="row">
            <h4 className="col s6" t><u>Cachetones</u></h4>
            <h4 className="col s3">{subject.length === 0 ? ("") : ("'" + subject + "'")}</h4>
            <h4 className="col s3 right-align">{capitalizeFirstLetter(storefront)}</h4>
        </div>
    );
}
export default Header;
