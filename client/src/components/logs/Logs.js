import React, { useState, useEffect } from 'react'
import LogItem from './LogItem';

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getLogs();
    }, []);

    const getLogs = async () => {
        setLoading(true);
        const res = await fetch('/api/v1/craigslist?page=1&subject=beer+brewing+equipment');
        const data = await res.json();

        setLogs(data);
        setLoading(false);
    }

    if (loading) {
        return <h3>loading...</h3>
    }
    return (
        <ul className="collection with-header">
            <li className="collection-header">
                <h4 className="center">Cachetons!</h4>
            </li>
            {!loading && logs.length === 0 ? (<p>No logs to show.</p>
            ) : (
                logs.results.map(r => <LogItem r={r} key={r.title} />)
            )}
        </ul>
    );
};
export default Logs;