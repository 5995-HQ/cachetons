import React from 'react'

export const Preloader = () => {
    return (
        <div>
            <button type="button" className="bg-rose-600 ..." disabled>
                <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12C2,17.104568 7.104568,22 12,22C17.104568,22 22,17.104568 22,12A10,10 0 0,0 12,2M12,20C6.486,20 2,16.486 2,12C2,7.514 4.514,2.5 12,2.5C17.514,2.5 22,7.514 22,12C22,16.486 17.514,20 12,20Z" />
                </svg>
            </button>
        </div>
    );
};

export default Preloader;