"use client"

import { useEffect, useState } from 'react';
import { QuoteFadeOutContext } from '@/contexts/QuoteFadeOutContext';
import { getLikedQuotes, updateLikedQuotes } from '@/actions/LikesProvider';
import Quote from './Quote';
import Paginator from './Paginator';
import fileQuotes from '~/data/quotes.json';

const quotes = fileQuotes;
const quotesPerPage = 30; // Initial number of quotes to display 

export default function QuoteGrid() {
    const [likedQuotesIdCollection, setLikedQuotesIdCollection] = useState<number[]>([])
    const [isQuoteFadingOut, setIsQuoteFadingOut] = useState(false);
    const [likedQuotesOnly, setLikedQuotesOnly] = useState(false);
    // State for current page's quotes
    const [quotesToPresent, setQuotesToPresent] = useState<typeof quotes>(quotes.slice(0, quotesPerPage));
    let currentPageNum = 1;

    // If the quotes are liked, then only show the liked quotes otherwise, show all the quotes avaialble
    const setPageQuotes = (quotesPerPage: number) => {
        let newQuotes: typeof quotes = [];
        if (likedQuotesOnly) {
            likedQuotesIdCollection.forEach((id) => {
                var likedQuote = quotes.find(q => q.id === id);
                if (likedQuote) {
                    newQuotes.push(likedQuote)
                }
            })
            newQuotes = newQuotes.slice((currentPageNum - 1) * quotesPerPage, currentPageNum * quotesPerPage);
        }
        else {
            newQuotes = quotes.slice((currentPageNum - 1) * quotesPerPage, currentPageNum * quotesPerPage);
        }

        // Start transitioning existing quotes out of the window then set new quotes and transition them in
        setIsQuoteFadingOut(true);
        setTimeout(() => {
            setQuotesToPresent(newQuotes)
            setIsQuoteFadingOut(false);
        }, 480);
    };

    //Handler for Next/Previous buttons from Pagination component.
    const setQuotesForPage = (page: number, quotesPerPage: number) => {
        currentPageNum = page;
        setPageQuotes(quotesPerPage)
    }

    //Hook used to trigger page change when likedQuotesOnly is changed.
    useEffect(() => {
        setPageQuotes(quotesPerPage)
    }, [likedQuotesOnly])


    // Get initial liked quotes from cookie
    useEffect(() => {
        getLikedQuotes()
            .then(quotes => {
                setLikedQuotesIdCollection(quotes);
            })
            .catch(error => {
                console.error('Error fetching likes:', error);
            });
    }, []);

    //On like button clicked/unclicked, update the liked quote cookie accordingly
    const handleLike = async (quoteId: number, currentlyLiked: boolean) => {
        try {
            const newLikedQuotes = await updateLikedQuotes(
                quoteId,
                currentlyLiked ? 'remove' : 'add'
            );
            setLikedQuotesIdCollection(newLikedQuotes);
        } catch (error) {
            console.error('Failed to update likes:', error);
        }
    };

    // Sort quotes: liked first, then the rest on that page
    const sortedQuotes = [...quotesToPresent].sort((a, b) => {
        const aIsLiked = likedQuotesIdCollection.includes(a.id)
        const bIsLiked = likedQuotesIdCollection.includes(b.id)
        if (aIsLiked && !bIsLiked) return -1
        if (!aIsLiked && bIsLiked) return 1
        return 0
    })

    return (
        <div>
            <Paginator
                quotesPerPage={quotesPerPage}
                totalQuotes={likedQuotesOnly ? likedQuotesIdCollection.length : quotes.length}
                onPageChange={(pageNum) => setQuotesForPage(pageNum, quotesPerPage)}
                onLikedOnlyChanged={setLikedQuotesOnly} />

            <QuoteFadeOutContext value={isQuoteFadingOut}>
                <div className="mt-8 columns-1 md:columns-2 lg:columns-3 gap-4 px-4 fade-in-delayed">
                    {sortedQuotes.map((quote, index) => (
                        <Quote
                            key={quote.id}
                            index={index}
                            quote={quote}
                            isLiked={likedQuotesIdCollection.includes(quote.id)}
                            onLikeChange={handleLike}
                        />
                    ))}
                </div>
            </QuoteFadeOutContext>
        </div>
    );
}