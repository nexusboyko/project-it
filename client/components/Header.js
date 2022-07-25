import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

class Header extends React.Component {
  render() {
    return (
      <>
        <div className='container px-5 d-flex-row text-center mt-5'>
          <div className='me-3'>
            <Link href={'/'} className='m-0 p-0'>
              <Image
                src='/main.svg'
                alt='Image Logo'
                width={40}
                height={40}
                className='m-0 p-0'
                type='button'
              />
            </Link>
          </div>

          <div class='btn-group mt-2'>
            <Link href={'/'}>
              <button type='button' class='btn active'>
                Home
              </button>
            </Link>
            <Link href={'/cards'}>
              <button type='button' class='btn active'>
                Projects
              </button>
            </Link>
            <Link href={'/'}>
              <button type='button' class='btn disabled'>
                Profile
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
