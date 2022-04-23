import React, { useState, useEffect } from 'react'
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import '../../App.css'
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import ReactPaginate from 'react-paginate';



const Logs = ({ storefront, subject }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const handlePageClick = (data) => { 
        console.log(data.selected);
    };



    useEffect(() => {
        setLoading(false);
        getLogs();
    }, [storefront, subject]);

    const getLogs = async () => {
        setLoading(true);
        const res = await fetch(`/api/v1/${storefront.toLowerCase()}?subject=${subject}`);
        const data = await res.json();

        setLogs(data);
        setLoading(false);
    }
    // TODO: Add a basic site template with empty square. 
    if (loading) {
        return <Preloader />;
    }
    return (
        <div className="pl-96" >
            <ul role="list" className="grid grid-cols-10 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                {!loading && !logs.results ? (<h1>No Results found</h1>) : (
                    logs.results.map(r => <LogItem r={r} key={r.id} />)
                )}
            </ul>
            <ReactPaginate
                containerClassName={'border-t border-gray-200 px-4 flex items-center justify-between sm:px-0'}                
                previousLabel={<ArrowNarrowLeftIcon />}
                nextLabel={<ArrowNarrowRightIcon />}
                previousClassName="mr-3 h-5 w-5 text-gray-400"
                nextClassName="ml-3 h-5 w-5 text-gray-400"
                pageCount={10}
                marginPagesDisplayed={5}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}      
                activeClassName="border-blue-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                pageClassName='border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'
                breakClassName='border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'
                breakLinkClassName="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                
            />
        </div >
    );
};
export default Logs;