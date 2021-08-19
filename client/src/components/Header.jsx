import React, { useState, useEffect } from 'react'


const Header = ({ }) => {
    return (

        <div className="grid">
            <div className="flex items-stretch font-sans md:font-serif text-4xl mt-8 ml-96 self-auto">
                <p>Cachetons</p>
                <p className="pl-96 mt-2 font-sans md:font-serif text-2xl self-auto">Search through some of your favorite user to user marketplaces</p>
            </div>
        </div>

    );
}
export default Header;