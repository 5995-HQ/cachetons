import React, { useState, useEffect } from 'react'
import '../App.css'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



const Header = ({ subject, storefront }) => {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    return (
        <div className="row">
            <h4 className="col s4" t><u>Cachetones</u></h4>
            <h4 className="col s3 center" value={search} onChange={r => setSearch(r.target.value)}>{search}</h4>
            <h4 className="col s5 right-align">{capitalizeFirstLetter(storefront)}</h4>
        </div>
    );
}
export default Header;




{/*  */ }