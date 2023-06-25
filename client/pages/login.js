import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <div className='container'>
          <h1 className='display-6'>Logged in as {session.user.email}</h1>
          <button className='btn btn-primary' onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className='container'>
          <h1 className='display-6'>Not signed in.</h1>
          <button className='btn btn-primary' onClick={() => signIn()}>
            Sign in
          </button>
        </div>
      </>
    );
  }
}

export default Login;
