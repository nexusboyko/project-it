import React, { useEffect, useState } from 'react';
import CardsContainer from '../components/CardsContainer';

function Cards() {
  // const [item, setItem] = useState("");

  // useEffect(() => {
  //   fetch('http://localhost:3001/api/card')
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         console.log("Response:")
  //         console.log(result);

  //         console.log("JSON Response:")
  //         console.log(JSON.parse(result))

  //         setItem(result);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // });

  // const card = JSON.parse(item);

  const [items, setItems] = useState([]);
  const cards = [];

  useEffect(() => {
    fetch('http://localhost:3001/api/list')
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
        <h1 className="display-3">Cards</h1>

        {/* <Card key={card.id} {...card} /> */}
        <CardsContainer cards={cards} />
      </main>
    </>
  );
}

export default Cards;
