import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

function Cards() {
  let [item, setItem] = useState("");

  useEffect(() => {
    fetch('http://localhost:3001/api/card')
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("Response:")
          console.log(result);
  
          console.log("JSON Response:")
          console.log(JSON.parse(result))
  
          setItem(result);
        },
        (error) => {
          console.log(error);
        }
      );
  });
  
  const card = JSON.parse(item);

  return (
    <>
      <main className="p-3 mx-auto" style={{ maxWidth: '90rem' }}>
        <h1 className="display-3">Cards</h1>

        <Card key={card.id} {...card} />
      </main>
    </>
  );
}

export default Cards;
