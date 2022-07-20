import React from 'react';
import Link from 'next/link';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10);

// create card and upload to Redis database
async function createCard(props) {
  const defaultCard = {
    id: -1,
    img: '',
    title: 'New title',
    desc: 'New description',
    author: 'Anonymous',
    full: false,
  };
  const newCard = convertFormToCard();
  const card = Object.assign({}, defaultCard, newCard);

  Object.keys(card).forEach(
    (k) => (card[k] = card[k] === '' ? defaultCard[k] : card[k])
  );

  console.log(card);
  console.log(JSON.stringify(card));

  try {
    const res = await fetch('http://localhost:3001/api/public/projects', {
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

function convertFormToCard() {
  const data = Array.from(
    document.querySelectorAll('#newCardForm input')
  ).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
  
  const desc = document.querySelector('#newCardForm textarea');
  const full = document.querySelector('#full');
  // const img = document.querySelector('#img');

  data['desc'] = desc.value;
  data['id'] = nanoid();
  data['full'] = full.checked;
  // TODO: Convert uploaded image file to URL that can also be displayed

  return data;
}

function newCard() {
  return (
    <>
      <div className='container border rounded rounded-5 p-4 mt-5'>
        <form id='newCardForm' action=''>
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

          <div className='form-check mb-3'>
            <input
              className='form-check-input'
              type='checkbox'
              id='full'
            ></input>
            <label className='form-check-label'>Full</label>
          </div>
        </form>
        <Link href='/cards'>
          <button
            type='submit'
            className='btn btn-primary'
            onClick={createCard}
          >
            <strong>Create card</strong>
          </button>
        </Link>
      </div>
    </>
  );
}

export default newCard;
