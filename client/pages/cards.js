import React, { useEffect, useState } from 'react';
import CardsContainer from '../components/CardsContainer';

async function createCard() {
  const card = {
    id: 999,
    img: 'https://picsum.photos/1900',
    title: 'CREATED CARD',
    desc: '...',
    author: 'Alex Boyko',
    full: true,
  };

  try {
    const res = await fetch('http://localhost:3001/api/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    });
    
    const cardJson = await res.json();
    console.log(cardJson);
  } catch (error) {
    console.log(error);
  }
}

function Cards() {
  const [items, setItems] = useState([]);
  const cards = [];

  useEffect(() => {
    fetch('http://localhost:3001/api/list', { method: 'GET' })
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

  console.log(cards);

  return (
    <>
      <main className="p-3 mx-auto" style={{ maxWidth: '90rem' }}>
        <h1 className="display-4 fs-1">Cards</h1>
        <CardsContainer cards={cards} />

        <div className="text-center p-5">
          <button className="btn btn-primary" onClick={createCard}>
            <strong>Add card</strong>
          </button>
        </div>
      </main>
    </>
  );
}

export default Cards;
