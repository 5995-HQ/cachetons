import React from 'react'
import PropTypes from 'prop-types'
import nopic from '../../assets/nopic.png'

const LogItem = ({ r }) => {
    return (
        <div>
            < div className="group block w-full aspect-w-5 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-00 focus-within:ring-indigo-500 overflow-hidden" >
                <a href={r.link_} target="_blank" rel="noopener noreferrer">
                    <div align="center">
                        <img className="object-cover pointer-events-none group-hover:opacity-20" src={r.image === "0000" ? nopic: r.image} alt=""/>
                    </div>
                    <div className="mt-2 block text-m font-medium truncate pointer-events-none">
                        {r.title}
                        <div className="price block text-m font-medium pointer-events-none">
                            {r.price}
                        </div>
                    </div>
                </a>
            </div >
        </div >

    )
}

LogItem.propTypes = {
    log: PropTypes.object.isRequired
}

export default LogItem
