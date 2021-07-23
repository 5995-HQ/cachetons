import React, { useState } from 'react'


const SelectStoreModal = ({ }) => {
    const [store, setStore] = useState('');
    const [option, setOption] = useState('');


    return (
        <div className="container">
            <div className="row">
                <div className="input-field col s4">
                    <select name="store" value={store} onChange={r => setStore(r.target.value)}>
                        <option value="" disabled selected>Pick your market</option>
                        <option value="Craigslist">Craigslist</option>
                        <option value="Ebay"> Ebay </option>
                        <option value="Etsy"> Etsy </option>
                    </select>
                </div>
                <div className="input-field col s4">
                    <select name="sort" value={option} onChange={e => setOption(e.target.value)}>
                        <option value="" disabled selected>Sort by</option>
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
