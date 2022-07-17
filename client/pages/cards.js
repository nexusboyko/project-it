import React, { useEffect, useState } from 'react';
import CardsContainer from '../components/CardsContainer';

async function createCard(props) {
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
  } catch (error) {
    console.log(error);
  }
}

function getCardFormData() {
  let data = Array.from(document.querySelectorAll('#newCardForm input')).reduce(
    (acc, input) => ({ ...acc, [input.id]: input.value }),
    {}
  );
  console.log(data);
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

  return (
    <>
      <main className='p-3 mx-auto' style={{ maxWidth: '90rem' }}>
        <h1 className='display-4 fs-1'>Cards</h1>
        <CardsContainer cards={cards} />

        <div className='text-center p-5'>
          <button className='btn btn-primary' onClick={createCard}>
            <strong>Add card</strong>
          </button>
        </div>

        <form
          id='newCardForm'
          action=''
          className='border rounded p-5 col-md-8'
        >
          <div className='mb-3'>
            <label className='form-label'>Image</label>
            <input className='form-control' type='file' id='image'></input>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='title'
              className='form-control'
              id='title'
              placeholder='New title'
            ></input>
            <label>Title</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='description'
              className='form-control'
              id='desc'
              placeholder='New description'
            ></input>
            <label>Description</label>
          </div>
          <div className='mb-3'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id='full'
              ></input>
              <label className='form-check-label'>Full</label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id='notFull'
              ></input>
              <label className='form-check-label'>Not Full</label>
            </div>
          </div>
          <button
            type='submit'
            className='btn btn-primary'
            onClick={getCardFormData}
          >
            <strong>Create card</strong>
          </button>
        </form>
      </main>
    </>
  );
}

export default Cards;
