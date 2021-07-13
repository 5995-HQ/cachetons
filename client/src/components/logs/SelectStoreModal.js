import React, { useState } from 'react'


const SelectStoreModal = ({ onSelect, onOption }) => {
    const [store, setStore] = useState('');
    const [option, setOption] = useState('');
    return (
        <div className="container">
            <div className="row">
                <div className="input-field col s4">
                    <select name="store" value={store} onSubmit={e => onSelect(e.target.value)}>
                        <option value="" disabled selected>Pick your market</option>
                        <option value="Craigslist">Craigslist</option>
                        <option value="Ebay"> Ebay </option>
                        <option value="Etsy"> Etsy </option>
                    </select>
                </div>
                <div className="input-field col s4">
                    <select name="sort" value={option} onChange={e => onOption(e.target.value)}>
                        <option value="" disabled selected>Sort by</option>
                        <option value="Name"> Name </option>
                        <option value="Price"> Price </option>
                        <option value="Popularity"> Popularity </option>
                    </select>

                </div>
                <div className="input-field col s4">
                    <select>
                        <option value="" disabled selected>I don't know, something else</option>
                        <option value="Name"> Name </option>
                        <option value="Price"> Price </option>
                        <option value="Popularity"> Popularity </option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SelectStoreModal;
