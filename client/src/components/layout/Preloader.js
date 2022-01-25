import React from 'react'

export const Preloader = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 100 100" width="100">
                    <circle cx="50" cy="50" r="40" />
                    <circle cx="50" cy="50" r="4" />
                    <path d="M12,2A10,10 0 0,0 2,12C2,17.104568 7.104568,22 12,22C17.104568,22 22,17.104568 22,12A10,10 0 0,0 12,2M12,20C6.486,20 2,16.486 2,12C2,7.514 4.514,2.5 12,2.5C17.514,2.5 22,7.514 22,12C22,16.486 17.514,20 12,20Z" />
                </svg>
            </div>            
            <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
            <p className="w-1/3 text-center text-white">One moment while we collect results.</p>
            <p className="w-1/3 text-center text-white">This may take a minute...</p>
        </div>
    );
};

export default Preloader;

