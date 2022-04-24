import React, { useState, useEffect } from 'react'
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import '../../App.css'


const Logs = ({ storefront, subject }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getLogs();
    }, [storefront, subject], []);

    const getLogs = async () => {
        setLoading(true);
        if (subject !== undefined) {
            const res = await fetch(`/api/v1/${storefront.toLowerCase()}?subject=${subject}`);
            const data = await res.json();
            setLogs(data);
            setLoading(false);
        } else {
            const res = ""
            const data = ""
            setLogs(data);
            setLoading(false);
        }
    }
    // TODO: Add a basic site template with empty square. 
    if (loading) {
        return <Preloader />;
    }
    return (
        <div className="pl-72 pr-72" >
            <ul role="list" className="grid grid-cols-10 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {!loading && logs.length === 0 ? (<p></p>
                ) : (
                    logs.results.map(r => <LogItem r={r} key={r.id} />)
                )}
            </ul>
        </div >
    );
};
export default Logs;