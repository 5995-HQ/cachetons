import React, { useState, useEffect } from 'react'
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';

const Logs = ({ store, subject }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getLogs();
    }, []);

    const getLogs = async () => {
        setLoading(true);
        const res = await fetch(`/api/v1/${store.toLowerCase()}?subject=${subject}`);
        const data = await res.json();
        setLogs(data);
        setLoading(false);
    }
    // TODO: Add a basic site template with empty square. 
    if (loading) {
        return <Preloader />;
    }
    return (

        <div className="container">
            <ul>
                {!loading && logs.length === 0 ? ("") : (
                    logs.results.map(r => <LogItem r={r} key={r} />)
                )}
            </ul>
        </div>
    );
};
export default Logs;