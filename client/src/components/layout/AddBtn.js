import React from 'react'

const Addbtn = () => {
    return (
        <div className="fixed-action-btn">
            <a href="#add-log-modal" className="btn-floating btn-large blue darken-2 modal-trigger">
                <i className="large material-icons">add</i>
            </a>
            <ul>
                <li>
                    <a href="#store-modal" className="btn-floating purple modal-trigger">
                        <i className="material-icons">storefront</i>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Addbtn;
