import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import CardsContainer from '../components/CardsContainer';

function Cards() {
  const [items, setItems] = useState([]);

  // fetch cards from database on first page load
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

  return (
    <>
      <Head>
        <title>Projects</title>
        <meta name='description' content='Public projects list' />
        <link rel='icon' href='/main.ico' />
      </Head>
      <main className='p-3 mx-auto' style={{ maxWidth: '90rem' }}>
        <div className='d-flex justify-content-center py-3'>
          <Link href='/card/new'>
            <button
              className='btn btn-sm btn-primary text-white m-3'
              type='button'
            >
              <strong>Add project</strong>
            </button>
          </Link>
        </div>

        <CardsContainer cards={items} />
      </main>
    </>
  );
}

export default Cards;
