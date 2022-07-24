import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

class Header extends React.Component {
  render() {
    return (
      <>
        <div className='d-flex justify-content-center align-items-center mt-5'>
          <div className='me-3'>
            <Link href={'/'} className='m-0 p-0'>
              <Image
                src='/logo-main.svg'
                alt='Image Logo'
                width={50}
                height={50}
                className='m-0 p-0'
                type='button'
              />
            </Link>
          </div>

          <div className='d-flex align-items-center justify-content-center'>
            <ul className='nav nav-pills'>
              <li className='nav-item'>
                <Link href={'/'}>
                  <a className='nav-link' href='#'>
                    Home
                  </a>
                </Link>
              </li>
              <li className='nav-item'>
                <Link href={'/cards'}>
                  <a className='nav-link' href='#'>Projects</a>
                </Link>
              </li>
              <li className='nav-item'>
                <Link href={'#'}>
                  <a className='nav-link disabled' href='#'>Profile</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
