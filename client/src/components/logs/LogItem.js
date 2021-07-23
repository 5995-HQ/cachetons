import React from 'react'


const LogItem = ({ r }) => {

    const no_image = "../assets/nophoto.png";

    return (
        <div className="child">
            <form>
                <a href={r.link_} target="_blank" rel="noopener noreferrer">
                    <div align="center">
                        <img className="circular-square" src={r.image} />

                    </div>
                    <div className="link_text">
                        {r.title}
                        <div className="price">{r.price}</div>
                    </div>
                </a>
            </form>
        </div >

    );
};

export default LogItem;
