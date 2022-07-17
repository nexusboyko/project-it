import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CardsContainer from '../components/CardsContainer';

// create card and upload to database
async function createCard(props) {
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
  const data = Array.from(
    document.querySelectorAll('#newCardForm input')
  ).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});

  data['id'] = uuidv4();
}

function Cards() {
  const [items, setItems] = useState([]);
  const cards = [];

  // fetch cards from database
  useEffect(() => {
    fetch('http://localhost:3001/api/list', {
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

        <div className='text-center p-5'>
          <button className='btn btn-primary' onClick={createCard}>
            <strong>Add card</strong>
          </button>
        </div>

        <form
          id='newCardForm'
          action=''
          className='border rounded p-5 col-md-8 mx-auto'
        >
          <div className='mb-3'>
            <label className='form-label'>Image</label>
            <input
              className='form-control'
              type='file'
              id='img'
              accept='image/png, image/jpg, image/jpeg'
            ></input>
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
              type='author'
              className='form-control'
              id='author'
              placeholder='New title'
            ></input>
            <label>Author</label>
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
        </form>
        <button
          // type='submit'
          className='btn btn-primary'
          onClick={getCardFormData}
        >
          <strong>Create card</strong>
        </button>
      </main>
    </>
  );
}

export default Cards;
