import React from 'react'
import '../App.css'

const Results = (props) => {
    const options = props.results.map(r => (
        <div className="child">
            <form>
                <a href={r.link_}>
                    <img className="circular--square" src={r.image} alt="" />
                    <br>
                    </br>
                    <div className="link_text">
                        {r.title}
                        <p></p>
                        {r.price}
                        <p></p>
                    </div>

                </a>
            </form>
        </div >

    ))
    return <div className="parent-wrapper">
        <div className="parent">
            <ul>{options}</ul>
        </div>
    </div>
}

export default Results

