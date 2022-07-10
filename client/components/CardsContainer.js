import React from "react";

import Card from "../components/Card.js";

function CardsContainer(props) {
  const cardList = props.cards;
  const cards = cardList.map((card) => (
    <Card
      key={card.id}
      img={card.img}
      title={card.title}
      desc={card.desc}
      author={card.author}
      full={card.full}
      date={new Date()}
    />
  ));

  return (
    <>
      <div className="row g-2">{cards}</div>
    </>
  );
}

export default CardsContainer;
