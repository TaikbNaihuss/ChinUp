"use server"

import { cookies } from 'next/headers'

export async function getLikedQuotes(): Promise<number[]> {
    console.log('Fetching liked quotes from cookie...')
    const cookieStore = await cookies();
    const likedQuotes = cookieStore.get('likedQuotes')?.value;
    console.log('Current liked quotes from cookie:', likedQuotes);

    return likedQuotes ? JSON.parse(likedQuotes) : [];
}

export async function updateLikedQuotes(quoteId: number, action: 'add' | 'remove') {
    const cookieStore = await cookies();
    const existingLikes = cookieStore.get('likedQuotes')?.value;
    const likedQuotes = existingLikes ? JSON.parse(existingLikes) : [];

    const newLikedQuotes = action === 'add'
        ? [...likedQuotes, quoteId]
        : likedQuotes.filter((id: number) => id !== quoteId);

    cookieStore.set('likedQuotes', JSON.stringify(newLikedQuotes));

    return newLikedQuotes;
}
