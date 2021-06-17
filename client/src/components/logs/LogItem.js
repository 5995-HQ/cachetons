import React from 'react'
import PropTypes from 'prop-types'

const LogItem = ({ r }) => {
    return (<div className="child">
        <form>
            <a href={r.link_} target="_blank" rel="noopener noreferrer">
                <div align="center"> <img className="circular-square" src={r.image} alt="" /> </div>
                <div className="link_text">
                    {r.title}
                    <div className="price">{r.price}</div>
                </div>
            </a>
        </form>
    </div >

    )
}

LogItem.propTypes = {
    log: PropTypes.object.isRequired
}

export default LogItem
