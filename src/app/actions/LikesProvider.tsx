"use server"

import { cookies } from 'next/headers'

export async function getLikedQuotes(): Promise<number[]> {
    const cookieStore = await cookies();
    const likedQuotes = cookieStore.get('likedQuotes')?.value;

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
