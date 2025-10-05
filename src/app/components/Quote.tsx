"use client"
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaRegCopy, FaRegHeart, FaHeart } from 'react-icons/fa';

type QuoteProps = {
    quote: { id: number; quote: string; author: string }
    index: number
    isLiked: boolean
    onLikeChange: (quoteId: number, currentlyLiked: boolean) => void
}

export default function Quote({ index, quote, isLiked, onLikeChange }: QuoteProps) {
    const [likeClicked, setLikeClicked] = useState(isLiked);

    useEffect(() => {
        setLikeClicked(isLiked);
    }, [isLiked]);

    const handleLike = async () => {
        try {
            setLikeClicked(!isLiked)
            console.log('Updating like for quote ID:', quote.id, 'Action:', isLiked ? 'remove' : 'add')

            onLikeChange(quote.id, isLiked)
        } catch (error) {
            console.error('Error updating like:', error)
            toast.error('Failed to update like')
            setLikeClicked(isLiked) // Revert state on error
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(`${quote.quote} - ${quote.author}`)
            .then(() => toast('Copied to clipboard!'))
            .catch(() => toast.error('Failed to copy quote.'));
    };

    return (
        <div id={quote.id.toString()}
            className={`break-inside-avoid mb-4 px-6 pt-6 pb-3 rounded-lg bg-yellow-300/30 dark:bg-white/10 backdrop-blur-sm
                            shadow-lg hover:shadow-xl
                            fade-in-staggered`}
            style={{
                animationDelay: `${index}ms`,
            }}
        >
            <div className="grid grid-rows-[1fr_40px]">
                <p className="text-xl mb-4">{quote.quote}</p>
                <div className='flex justify-between items-center'>
                    <div className="grid grid-cols-[repeat(2,45px)] gap-2">
                        <button className="like-button font-mono rounded-full hover:text-red-500/60 transition" onClick={async () => await handleLike()}>
                            {likeClicked ? <FaHeart className="h-5 w-5 text-red-500/80" /> : <FaRegHeart className="h-5 w-5" />}
                        </button>
                        <button className="copy-button font-mono rounded-full hover:text-green-400/70 transition" onClick={handleCopy}>
                            <FaRegCopy className="h-5 w-5" />
                        </button>
                    </div>
                    <p className="text-right text-sm opacity-75">- {quote.author}</p>
                </div>

            </div>
        </div>
    );
}