import React, { useEffect, useState } from 'react';
import { customAlphabet } from 'nanoid';
import CardsContainer from '../components/CardsContainer';

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10);

// create card and upload to database
async function createCard(props) {
  const defaultCard = {
    id: -1,
    img: '',
    title: 'New title',
    desc: 'New description',
    author: 'Anonymous',
    full: false,
  };
  const newCard = getCardFormData();
  const card = Object.assign({}, defaultCard, newCard);

  Object.keys(card).forEach(
    (k) => (card[k] = card[k] === '' ? defaultCard[k] : card[k])
  );
  console.log(card);

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
  const desc = document.querySelector('#newCardForm textarea');

  data['desc'] = desc.value;
  data['id'] = nanoid();

  return data;
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

        <button
          type='button'
          className='btn btn-primary'
          data-bs-toggle='modal'
          data-bs-target='#newCardFormModal'
        >
          <strong>Add card</strong>
        </button>

        <div
          className='modal fade'
          id='newCardFormModal'
          data-bs-backdrop='static'
          data-bs-keyboard='false'
          tabIndex='-1'
          aria-labelledby='staticBackdropLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='staticBackdropLabel'>
                  Create card
                </h5>

                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>

              <form id='newCardForm' action='' className='modal-body p-3'>
                <div className='mb-3'>
                  <label>Image</label>
                  <input
                    className='form-control form-floating'
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
                  <textarea
                    type='desc'
                    className='form-control'
                    placeholder='New description'
                    id='desc'
                    style={{ maxHeight: '25ch' }}
                  ></textarea>
                  <label>Description</label>
                </div>
              </form>

              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Discard
                </button>
                <button
                  type='submit'
                  className='btn btn-primary'
                  onClick={createCard}
                >
                  <strong>Create card</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Cards;
