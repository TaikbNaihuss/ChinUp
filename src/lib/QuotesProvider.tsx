"use server"
import { promises as fs } from 'node:fs';

export type QuoteType = {
    id: number,
    quote: string,
    author: string
};

export async function getQuotes(page: number, quotesPerPage: number) : Promise<QuoteType[]> { 
  const filePath = process.cwd() + '/src/data/quotes.json';
  const quotesFile = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(quotesFile);
  
  // Pagination example
  const start = (page - 1) * quotesPerPage;
  const pagedQuotes = data.slice(start, start + quotesPerPage);
  
  return pagedQuotes;
}

export async function getQuotesCount() : Promise<number>
{
    const filePath = process.cwd() + '/src/data/quotes.json';
    const quotesFile = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(quotesFile);

    return data.length
}