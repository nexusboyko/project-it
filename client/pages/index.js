import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name='description' content='Home page' />
        <link rel='icon' href='/main.ico' />
      </Head>

      <main className='p-3 mx-auto' style={{ maxWidth: '90rem' }}>
        <div
          id='hero'
          className='container d-flex flex-column align-items-center justify-content-center my-4'
        >
          <h4 className='display-4'>
            Welcome to <strong>Project It</strong>.
          </h4>
          <p className='fs-3 mb-5'>Get started by viewing public projects.</p>

          <Link href='/cards'>
            <button className='btn btn-lg btn-primary'>
              <strong>
                <i className='bi bi-collection text-white'></i> Projects
              </strong>
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}

export default Home;
