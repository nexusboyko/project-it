import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

class Header extends React.Component {
  render() {
    return (
      <>
        <div className='container px-5 d-flex-row text-center mt-5'>
          <div className=''>
            <Image
              src='/main.svg'
              alt='Image Logo'
              width={40}
              height={40}
              className='m-0 p-0'
            />
          </div>

          <div className='btn-group mt-2'>
            <Link href='/'>
              <button type='button' className='btn active'>
                <strong>Home</strong>
              </button>
            </Link>
            <Link href='/projects'>
              <button type='button' className='btn active'>
                <strong>Projects</strong>
              </button>
            </Link>
            <Link href='/'>
              <button type='button' className='btn disabled'>
                <strong>Profile</strong>
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
