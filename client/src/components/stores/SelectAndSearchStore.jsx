import React, { Component, Fragment, useState, useEffect, ImageBackground, StyleSheet, Text, View } from 'react'
import { Menu, Transition } from '@headlessui/react'


const SelectAndSearchStore = ({ sendSearch }) => {
    const [store, setStore] = useState('craigslist', 'ebay', 'etsy');
    const [search, setSearch] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        sendSearch(store, search);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex space-x-4 ml-96">
                <input
                    id="search"
                    placeholder="Find anything you want"
                        type="search"
                        value={search}
                        onChange={r => setSearch(r.target.value)}
                        required
                        className="px-48 py-4 placeholder placeholder-gray-500 text-base font-medium flex items-center text-black focus:outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                    />
                    <button className="w-full bg-indigo-500 border border-transparent rounded-md py-2 px-4 flex items-center text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                        onClick={() => setStore('craigslist')}>Craigslist</button>
                    <button className="w-full bg-indigo-500 border border-transparent rounded-md py-2 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                        onClick={() => setStore('ebay')}>Ebay</button>
                    <button className="w-full bg-indigo-500 border border-transparent rounded-md py-2 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                        onClick={() => setStore('etsy')}>Etsy</button>
            </div>                                
            </form>
        </div>
    )
}


export default SelectAndSearchStore;

