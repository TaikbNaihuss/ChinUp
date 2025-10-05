"use client"

import { use, useEffect, useState } from 'react';
import { getLikedQuotes, updateLikedQuotes } from '@/actions/LikesProvider';
import { useScrollPosition } from '@/hooks/ScrollHook';

import Quote from './Quote';


const quotes = [
    {
        id: 1,
        quote: "The sun himself is weak when he first rises, and gathers strength and courage as the day gets on.",
        author: "Charles Dickens"
    },
    {
        id: 2,
        quote: "Happiness is not something ready-made. It comes from your own actions.",
        author: "Dalai Lama"
    },
    {
        id: 3,
        quote: "The best way to cheer yourself up is to try to cheer somebody else up.",
        author: "Mark Twain"
    },
    {
        id: 4,
        quote: "In the middle of difficulty lies opportunity.",
        author: "Albert Einstein"
    },
    {
        id: 5,
        quote: "Your smile will give you a positive countenance that will make people feel comfortable around you.",
        author: "Les Brown"
    },
    {
        id: 6,
        quote: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
        author: "Albert Einstein"
    },
    {
        id: 7,
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        id: 8,
        quote: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        id: 9,
        quote: "Pursue what catches your heart, not what catches your eyes.",
        author: "Roy T. Bennett"
    },
    {
        id: 10,
        quote: "Start each day with a positive thought and a grateful heart.",
        author: "Roy T. Bennett"
    },
    {
        id: 11,
        quote: "Be grateful for what you already have while you pursue your goals. If you arent grateful for what you already have, what makes you think you would be happy with more.",
        author: "Roy T. Bennett"
    },
    {
        id: 12,
        quote: "Everything can be taken from a man but one thing: the last of the human freedoms—to choose ones attitude in any given set of circumstances, to choose ones own way.",
        author: "Viktor E. Frankl"
    },
    {
        id: 13,
        quote: "Life is about accepting the challenges along the way, choosing to keep moving forward, and savoring the journey.",
        author: "Roy T. Bennett"
    },
    {
        id: 14,
        quote: "Be brave to stand for what you believe in even if you stand alone.",
        author: "Roy T. Bennett"
    },
    {
        id: 15,
        quote: "Letting go means to come to the realization that some people are a part of your history, but not a part of your destiny.",
        author: "Steve Maraboli"
    },
    {
        id: 16,
        quote: "Never lose hope. Storms make people stronger and never last forever.",
        author: "Roy T. Bennett"
    },
    {
        id: 17,
        quote: "Do not fear failure but rather fear not trying.",
        author: "Roy T. Bennett"
    },
    {
        id: 18,
        quote: "Lack of direction, not lack of time, is the problem. We all have twenty-four hour days.",
        author: "Zig Ziglar"
    },
    {
        id: 19,
        quote: "Cry. Forgive. Learn. Move on. Let your tears water the seeds of your future happiness.",
        author: "Steve Maraboli"
    },
    {
        id: 20,
        quote: "You never change your life until you step out of your comfort zone; change begins at the end of your comfort zone.",
        author: "Roy T. Bennett"
    },
    {
        id: 21,
        quote: "Do not let the memories of your past limit the potential of your future. There are no limits to what you can achieve on your journey through life, except in your mind.",
        author: "Roy T. Bennett"
    },
    {
        id: 22,
        quote: "Let the improvement of yourself keep you so busy that you have no time to criticize others.",
        author: "Roy T. Bennett"
    },
    {
        id: 23,
        quote: "Incredible change happens in your life when you decide to take control of what you do have power over instead of craving control over what you don't.",
        author: "Steve Maraboli"
    },
    {
        id: 24,
        quote: "Believe in your infinite potential. Your only limitations are those you set upon yourself.",
        author: "Roy T. Bennett"
    },
    {
        id: 25,
        quote: "The man who moves a mountain begins by carrying away small stones.",
        author: "Confucius"
    },
    {
        id: 26,
        quote: "Happiness is not the absence of problems, it's the ability to deal with them.",
        author: "Steve Maraboli"
    },
    {
        id: 27,
        quote: "The only way of discovering the limits of the possible is to venture a little way past them into the impossible.",
        author: "Arthur C. Clarke"
    },
    {
        id: 28,
        quote: "Surround Yourself with People Who Believe in Your Dreams:Surround yourself with people who believe in your dreams, encourage your ideas, support your ambitions, and bring out the best in you.",
        author: "Roy T. Bennett"
    },
    {
        id: 29,
        quote: "Sometimes life knocks you on your ass... get up, get up, get up!!! Happiness is not the absence of problems, it's the ability to deal with them.",
        author: "Steve Maraboli"
    },
    {
        id: 30,
        quote: "Do what you love, love what you do, and with all your heart give yourself to it.",
        author: "Roy T. Bennett"
    },
    {
        id: 31,
        quote: "Learn the rules like a pro, so you can break them like an artist.",
        author: "Pablo Picasso"
    },
    {
        id: 32,
        quote: "Once you realize you deserve a bright future, letting go of your dark past is the best choice you will ever make.",
        author: "Roy T. Bennett"
    },
    {
        id: 33,
        quote: "Without ambition one starts nothing. Without work one finishes nothing. The prize will not be sent to you. You have to win it.",
        author: "Ralph Waldo Emerson"
    },
    {
        id: 34,
        quote: "If you believe very strongly in something, stand up and fight for it.",
        author: "Roy T. Bennett"
    },
    {
        id: 35,
        quote: "Change the way you look at things and the things you look at change.",
        author: "Wayne W. Dyer"
    },
    {
        id: 36,
        quote: "It's never too late to change your life for the better. You don't have to take huge steps to change your life. Making even the smallest changes to your daily routine can make a big difference to your life.",
        author: "Roy T. Bennett"
    },
    {
        id: 37,
        quote: "Always remember people who have helped you along the way, and dont forget to lift someone up.",
        author: "Roy T. Bennett"
    },
    {
        id: 38,
        quote: "Maturity is when you stop complaining and making excuses, and start making changes.",
        author: "Roy T. Bennett"
    },
    {
        id: 39,
        quote: "When in a relationship, a real man doesn't make his woman jealous of others, he makes others jealous of his woman.",
        author: "Steve Maraboli"
    },
    {
        id: 40,
        quote: "What's done is done. What's gone is gone. One of life's lessons is always moving on. Its okay to look back to see how far youve come but keep moving forward.",
        author: "Roy T. Bennett"
    },
    {
        id: 41,
        quote: "Strong people have a strong sense of self-worth and self-awareness; they dont need the approval of others.",
        author: "Roy T. Bennett"
    },
    {
        id: 42,
        quote: "Never stop dreaming, never stop believing, never give up, never stop trying, and never stop learning.",
        author: "Roy T. Bennett"
    },
    {
        id: 43,
        quote: "When the going gets tough, put one foot in front of the other and just keep going. Dont give up.",
        author: "Roy T. Bennett"
    },
    {
        id: 44,
        quote: "Stop giving other people the power to control your happiness, your mind, and your life. If you don't take control of yourself and your own life, someone else is bound to try.",
        author: "Roy T. Bennett"
    },
    {
        id: 45,
        quote: "At the end of the day, let there be no excuses, no explanations, no regrets.",
        author: "Steve Maraboli"
    },
    {
        id: 46,
        quote: "We all make mistakes, have struggles, and even regret things in our past. But you are not your mistakes, you are not your struggles, and you are here NOW with the power to shape your day and your future.",
        author: "Steve Maraboli"
    },
    {
        id: 47,
        quote: "If you have a strong purpose in life, you don't have to be pushed. Your passion will drive you there.",
        author: "Roy T. Bennett"
    },
    {
        id: 48,
        quote: "Whatever the mind can conceive and believe, it can achieve.",
        author: "Napoleon Hill"
    },
    {
        id: 49,
        quote: "I will not try to convince you to love me, to respect me, to commit to me. I deserve better than that; I AM BETTER THAN THAT...Goodbye.",
        author: "Steve Maraboli"
    },
    {
        id: 50,
        quote: "Although the world is full of suffering, it is full also of the overcoming of it.",
        author: "Helen Keller"
    }
];

let quotesCount = 20; // Initial number of quotes to display

export default function QuoteGrid() {
    const [likedQuotes, setLikedQuotes] = useState<number[]>([])
    const scrollPosition = useScrollPosition();

    //Number of quotes to display based on scroll position
    let staggeredQuotes: { id: number; quote: string; author: string }[] = quotes.slice(0, quotesCount);

    useEffect(() => {
        if (scrollPosition >= 99) {
            quotesCount += 25;
        }
    }, [scrollPosition]);

    useEffect(() => {
        staggeredQuotes = quotes.slice(0, quotesCount);
        console.log('Quotes to display:', staggeredQuotes.length);
    }, [quotesCount]);

    // Get initial liked quotes from cookie
    useEffect(() => {
        getLikedQuotes()
            .then(quotes => {
                setLikedQuotes(quotes);
            })
            .catch(error => {
                console.error('Error fetching likes:', error);
            });
    }, []);

    const handleLike = async (quoteId: number, currentlyLiked: boolean) => {
        try {
            const newLikedQuotes = await updateLikedQuotes(
                quoteId,
                currentlyLiked ? 'remove' : 'add'
            );
            setLikedQuotes(newLikedQuotes);
        } catch (error) {
            console.error('Failed to update likes:', error);
        }
    };

    // Sort quotes: liked first, then the rest
    const sortedQuotes = [...staggeredQuotes].sort((a, b) => {
        const aIsLiked = likedQuotes.includes(a.id)
        const bIsLiked = likedQuotes.includes(b.id)
        if (aIsLiked && !bIsLiked) return -1
        if (!aIsLiked && bIsLiked) return 1
        return 0
    })

    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 px-4 fade-in-delayed">
            {sortedQuotes.map((quote, index) => (
                <Quote
                    key={quote.id}
                    index={index}
                    quote={quote}
                    isLiked={likedQuotes.includes(quote.id)}
                    onLikeChange={handleLike}
                />
            ))}
        </div>
    );
}