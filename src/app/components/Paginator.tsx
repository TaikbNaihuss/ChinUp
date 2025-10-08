
import { useState } from 'react';
import Switch from '@mui/material/Switch';

type PaginatorProps = {
    quotesPerPage: number;
    totalQuotes: number;
    onPageChange?: (newPage: number) => void;
    onLikedOnlyChanged?: (checked: boolean) => void;
}

const buttonClass = `bg-yellow-500/40 dark:bg-gray-700
                     hover:bg-yellow-500 dark:hover:bg-gray-800
                     active:bg-yellow-600 dark:active:bg-black
                     outline-2 outline-yellow-400 dark:outline-gray-500
                     transition-all duration-200 
                     rounded-xl py-1 px-2 text-center`;

const baseContainerClass = `text-lg rounded-xl w-fit 
                            bg-yellow-300 shadow-xl dark:bg-gray-600 
                            py-2 px-5 fade-in-staggered`


export default function Paginator({ quotesPerPage: quotePerPage, totalQuotes, onPageChange, onLikedOnlyChanged }: PaginatorProps) {
    const [currentPageNum, setCurrentPageNum] = useState(1);
    const pageCount = Math.ceil(totalQuotes / quotePerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPageNum(newPage);
        onPageChange?.(newPage);
    };

    const handleLikedOnlyChange = (checked: boolean) => {
        setCurrentPageNum(1);
        onLikedOnlyChanged?.(checked);
    };

    return (
        <div className="fixed top-4 left-[50%] transform -translate-x-1/2 z-10 flex justify-center font-mono me-2">
            <div className={`${baseContainerClass} grid grid-cols-[1fr_180px] gap-2 mr-[2vw]`}>
                <div className="flex items-center justify-center mr-2">
                    <span className='text-nowrap'>Page {currentPageNum} of {pageCount}</span>
                </div>
                <div className='grid grid-cols-[100px_80px] gap-2 mr-2'>
                    <button className={buttonClass} onClick={() => handlePageChange(currentPageNum - 1)} disabled={currentPageNum === 1}>Previous</button>
                    <button className={buttonClass} onClick={() => handlePageChange(currentPageNum + 1)} disabled={currentPageNum === pageCount}>Next</button>
                </div>

            </div>
            <div className={baseContainerClass}>
                <div className='flex justify-center items-center'>
                    <span className='text-nowrap'>All</span>
                    <Switch color="error" onChange={(_, checked) => handleLikedOnlyChange(checked)}></Switch>
                    <span className='text-nowrap'>Liked only</span>
                </div>
            </div>
        </div>
    );
}

