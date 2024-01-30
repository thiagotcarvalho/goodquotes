'use client'
import React, { useState } from 'react'
import { db } from './firebase';
import { 
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy } from 'firebase/firestore';

const RANDOM_INDEX_MAX = 100000;

export default function Home() {
  const [quotes, setQuotes] = useState(
    {
      source: '',
      sourceType: '',
      quote: 'Click the Generate Quote button to generate a new quote!',
      quoteType: '',
      randomIndex: ''
    }
  );

  const fetchQuote = async () => {
    const quotesRef = collection(db, 'quotes');
    const randomIndex = generateRandomIndex(RANDOM_INDEX_MAX);
    console.log(randomIndex);

    const queryQuotesRefRight = query(
        quotesRef,
        where('randomIndex', '<', randomIndex),
        orderBy('randomIndex', 'desc'),
        limit(1));

    const queryQuotesRefLeft = query(
        quotesRef,
        where('randomIndex', '>=', randomIndex),
        orderBy('randomIndex', 'asc'),
        limit(1));

    const queryQuotesRefSnapshot = await getDocs(queryQuotesRefRight);

    if (queryQuotesRefSnapshot.size > 0) {
      queryQuotesRefSnapshot.forEach((doc) => {
        setQuotes(doc.data());
        console.log(doc.id, '=>', doc.data());

      });
    } else {
      const queryQuotesRefSnapshot = await getDocs(queryQuotesRefLeft);

      queryQuotesRefSnapshot.forEach((doc) => {
        setQuotes(doc.data());
        console.log(doc.id, '=>', doc.data());
      });
    }
  };

  function generateRandomIndex(max) {
    const maxKey = 3;
    const minKey = 1;
    const randomMap = {
      '1': Math.floor(Math.random() * max),
      '2': Math.floor(Math.random() * max),
      '3': Math.floor(Math.random() * max)
    };
    const randomKey = (Math.floor(Math.random() * (maxKey - minKey + 1)) + minKey).toString();

    return randomMap[randomKey];
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between sm:p-24 p-4'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm'>
        <h1 className='text-4xl p-4 text-center'>Good Quotes</h1>
        <ul>
          <li key={quotes.randomIndex} className='my-4 w-full flex justify-between'>
            <div className='p-4 w-full flex justify-between'>
              <span>{quotes.quote}</span>
              <span>{quotes.quoteType}</span>
              <span>{quotes.sourceName}</span>
              <span>{quotes.sourceType}</span>
            </div>
          </li>
        </ul>
        <button onClick={fetchQuote}>Generate New Quote</button>
      </div>
    </main>
  )
}