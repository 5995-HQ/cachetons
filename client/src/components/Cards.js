import React from 'react'
import '../App.css'

const Results = (props) => {
    const options = props.results.map(r => (
        <div className="child">
            <a href={r.link_}>
                <img src={r.image} />
                <center className="flex">
                    {r.title}
                    <p></p>
                    {r.price}
                </center>
            </a>
        </div>
    ))
    return <ul className="parent">{options}</ul>
}

export default Results

