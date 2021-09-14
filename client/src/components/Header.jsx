import React, { useState, useEffect } from 'react'
import '../App.css'


const Header = ({ }) => {
    return (
        <div>
            <div className="font-sans md:font-serif text-4xl">Cachetons</div>
            <div className="font-sans md:font-serif text-2xl" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                Search through some of your favorite user to user marketplaces
            </div>
        </div>
            


    );
}
export default Header;