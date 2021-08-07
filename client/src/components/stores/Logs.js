import React, { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import '../../App.css'


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
        <div className="pl-96" >
            <ul role="list" className="grid grid-cols-10 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {!loading && logs.length === 0 ? (<p>No logs to show.</p>
                ) : (
                    
                    logs.results.map(r => <LogItem r={r} key={r.id} />)
                )}
            </ul>
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                    <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Previous
                    </a>
                    <a
                        href="#"
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Next
                    </a>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                            <span className="font-medium">97</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <a
                                href="#"
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                            <a
                                href="#"
                                aria-current="page"
                                className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            >
                                1
                            </a>
                            <a
                                href="#"
                                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            >
                                2
                            </a>
                            <a
                                href="#"
                                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                            >
                                3
                            </a>
                            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                ...
                            </span>
                            <a
                                href="#"
                                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                            >
                                8
                            </a>
                            <a
                                href="#"
                                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            >
                                9
                            </a>
                            <a
                                href="#"
                                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            >
                                10
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </nav>
                    </div>
                </div>
            </div>

        </div >
    );
};
export default Logs;