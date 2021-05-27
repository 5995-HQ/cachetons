import React from 'react'
import '../App.css'

const Results = (props) => {
    const options = props.results.map(r => (
        <div className="child">
            <form>
                <a href={r.link_}>
                    <img src={r.image} />
                    {r.title}
                    <p></p>
                    {r.price}
                    <p></p>
                </a>
            </form>
        </div>

    ))
    return <div className="parent-wrapper">
        <div className="parent">
            <ul>{options}</ul>
        </div>
    </div>
}

export default Results

