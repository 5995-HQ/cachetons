import React, { useState, useEffect } from 'react'


const Header = ({ }) => {
    return (
            <div className="bg-white">
                <div className="mx-auto sm:py-8">
                    <div className="text-center">
                        <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">all in one place</h2>
                        <p className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                            cachetons
                        </p>
                        <p className="max-w-xl mt-2 mx-auto text-xl text-gray-500">
                            Search through some of your favorite user to user marketplaces
                        </p>
                    </div>
                </div>
        </div>

    );
}
export default Header;