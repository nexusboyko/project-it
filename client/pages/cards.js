import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CardsContainer from '../components/CardsContainer';

function Cards() {
  const [items, setItems] = useState([]);
  const cards = [];

  // fetch cards from database
  useEffect(() => {
    fetch('http://localhost:3001/api/public/projects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  items.forEach((item) => {
    cards.push(JSON.parse(item));
  });

  return (
    <>
      <main className='p-3 mx-auto' style={{ maxWidth: '90rem' }}>
        <h1 className='display-4 fs-1'>Cards</h1>

        <CardsContainer cards={cards} />

        <Link href='/card/new'>
          <button
            className='btn btn-primary text-center m-3'
            type='button'
          >
            <strong>Add new card</strong>
          </button>
        </Link>

      </main>
    </>
  );
}

export default Cards;
