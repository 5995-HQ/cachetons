import React, { useState } from 'react'


const SelectStoreModal = ({ onSelect }) => {
    const [store, setStore] = useState('');
    const [option, setOption] = useState('');
    return (
        <div className="container">
            <div className="row">
                <div className="input-field col s4">
                    <select name="store" value={store} onChange={e => onSelect(e.target.value)} multiple>
                        <option value="" disabled selected>Pick your market</option>
                        <option value="Craigslist"> Craigslist </option>
                        <option value="Ebay"> Ebay </option>
                        <option value="Etsy"> Etsy </option>
                    </select>
                </div>
                <div className="input-field col s4">
                    <select name="sort" value={option} onChange={e => onSelect(e.target.value)} multiple>
                        <option value="Craigslist"> By Name</option>
                        <option value="Ebay"> By Price </option>
                        <option value="Etsy"> Popularity </option>
                    </select>
                    <label>Sort by</label>
                </div>
            </div>
        </div>
    );
};

export default SelectStoreModal;
