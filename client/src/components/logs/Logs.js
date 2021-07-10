import React, { useState, useEffect } from 'react'
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

console.log(capitalizeFirstLetter('foo')); // Foo

const Logs = ({ storefront, subject }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getLogs();
    }, [storefront, subject]);

    const getLogs = async () => {
        setLoading(true);
        const res = await fetch(`/api/v1/${storefront.toLowerCase()}?subject=${subject}`);
        const data = await res.json();
        console.log(data)

        setLogs(data);
        setLoading(false);
    }
    // TODO: Add a basic site template with empty square. 
    if (loading) {
        return <Preloader />;
    }
    return (
        <ul className="collection with-header">
            <li className="collection-header">
                <div className="row">
                    <h4 className="col s6 align:left">cachetones</h4>
                    <h4 className="col s6 align:right">{capitalizeFirstLetter(storefront)}</h4>
                </div>
            </li>
            {!loading && logs.length === 0 ? (<p>No logs to show.</p>
            ) : (
                logs.results.map(r => <LogItem r={r} key={r.id} />)
            )}
        </ul>
    );
};
export default Logs;