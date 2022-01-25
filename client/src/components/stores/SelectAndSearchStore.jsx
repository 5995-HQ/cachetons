import React, { Component, Fragment, useState, useEffect, ImageBackground, StyleSheet, Text, View } from 'react'
import { Menu, Transition } from '@headlessui/react'

import '../../App.css'


const SelectAndSearchStore = ({ sendSearch }) => {
    const [store, setStore] = useState('craigslist');
    const [search, setSearch] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        sendSearch(store, search);
    }

    return (
        <div className="header">
            <form onSubmit={handleSubmit}>
                <div className="ml-96 mt-4">
                    <div className="flex space-x-4">
                        <div>
                            <input id="search" placeholder="Search something..." type="search" onInput={r => setSearch(r.target.value)} className="shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2.5 pr-12 sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <select
                                onChange={r => setStore(r.target.value)}
                                id="store"
                                name="store"
                                className="block w-full pl-3 pr-10 shadow-lg py-2.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                defaultValue="Pick a store"
                            >   
                                <option value="craigslist">Craigslist</option>
                                <option value="ebay">Ebay</option>
                                <option value="etsy">Etsy</option>
                                
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default SelectAndSearchStore;

