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
        <div id='header' className='row my-4'>
          <div className='col-md-7'>
            <h4 className='display-5 mb-4'>
              These are <strong>public</strong> projects.
            </h4>
            <p className='fs-4'>
              Each project has its own set of basic information, along with{' '}
              <br /> an indicator marking if that project is <i>open</i> or{' '}
              <i>closed</i> to new members.
            </p>

            <p className='fs-4 m-0'>
              To add your own project, click on the{' '}
              <button className='btn btn-sm border-dark disabled'>
                Add project
              </button>{' '}
              button.
            </p>
          </div>

          <div className='col-md-5 d-flex flex-column align-items-center justify-content-center border-start'>
            <small className='p-0 m-0'>
              Click on me to create your very own project!
            </small>
            <Link href='/card/new'>
              <button
                className='btn btn-lg btn-primary text-white m-3'
                type='button'
              >
                <strong>
                  <i className='bi bi-plus-square text-white'></i> Add project
                </strong>
              </button>
            </Link>
          </div>
        </div>

        <hr className='mb-4 pb-2' />

        <CardsContainer cards={cards} />
      </main>
    </>
  );
}

export default Cards;
