import React, { Component, Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'


const SelectAndSearchStore = ({ sendSearch }) => {
    const [store, setStore] = useState('craigslist');
    const [search, setSearch] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        sendSearch(store, search);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="ml-96 pt-6">
                <div className="flex space-x-4">
                    <div>
                        <input id="search" type="search" onChange={r => setSearch(r.target.value)} className="shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <select
                            onChange={r => setStore(r.target.value)}
                            id="store"
                            name="store"
                            className="block w-full pl-3 pr-10 shadow-lg  py-2.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            defaultValue="Craigslist"
                        >
                            <option>Craigslist</option>
                            <option>Etsy</option>
                            <option>Ebay</option>
                        </select>
                    </div>
                </div>
                </div>
            </form>
        </div>
    )
}


export default SelectAndSearchStore;

