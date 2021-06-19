import React, { useState, useEffect } from 'react'
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getLogs();
    }, []);

    const getLogs = async () => {
        setLoading(true);
        const res = await fetch('/api/v1/ebay?subject=beer+brewing');
        const data = await res.json();

        setLogs(data);
        setLoading(false);
    }

    if (loading) {
        return <Preloader />;
    }
    return (
        <ul className="collection with-header">
            <li className="collection-header">
                <h4 className="center">cachetones</h4>
            </li>
            {!loading && logs.length === 0 ? (<p>No logs to show.</p>
            ) : (
                logs.results.map(r => <LogItem r={r} key={r.title} />)
            )}
        </ul>
    );
};
export default Logs;