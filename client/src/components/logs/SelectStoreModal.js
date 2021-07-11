import React, { useState } from 'react'


const SelectStoreModal = ({ onSelect }) => {
    const [store, setStore] = useState('');

    const onSubmit = () => {
        console.log(store);
    }
    return (
        <div id='add-log-modal' className="modal" style={modalStyle}>
            <div className="modal-content">
                <h4> Pick a storefront</h4>
                <div className="row">
                    <div className="input-field">
                        <select name="store" value={store} className="browser-default" onChange={e => onSelect(e.target.value)}>
                            <option value="" disabled>
                                Select Storefront
                            </option>
                            <option value="Craigslist"> Craigslist </option>
                            <option value="Ebay"> Ebay </option>
                            <option value="Etsy"> Etsy </option>
                        </select>
                        <label htmlFor="store" className="active">
                            Storefront
                        </label>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a
                    href="#!" onClick={onSubmit}
                    className="modal-close waves-effect blue waves-green btn"
                >
                    Enter
                </a>
            </div>
        </div>
    );
};

const modalStyle = {
    width: "40%",
    height: "25%"

};

export default SelectStoreModal;
