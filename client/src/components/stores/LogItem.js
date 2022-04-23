import React from 'react'
import PropTypes from 'prop-types'

const LogItem = ({ r }) => {
    return (
        <div>
            <div className="flex-container">
            < div className="flex-item group w-full aspect-w-20 aspect-h-7 rounded-lg bg-gray-100">
                <a href={r.link_} target="_blank" rel="noopener noreferrer">
                    <div align="left" className="flex-item mt-2 block text-m font-medium truncate pointer-events-none">
                        {r.title}
                        <div className="price block text-m font-medium pointer-events-none">
                            {r.price}
                            </div>    
                    </div>
                    </a>
                    <div align="right">
                    <img className="object-cover pointer-events-none group-hover:opacity-20" src={r.image} alt="" />
                </div>
                </div >
            </div>

        </div >

    )
}

// LogItem.propTypes = {
//     log: PropTypes.object.isRequired
// }

export default LogItem
