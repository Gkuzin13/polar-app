import React, { useCallback } from 'react';
import app from '../firebase/firebase';
import { Link } from 'react-router-dom';

const SignIn = ({ history }) => {
  const handleSignIn = useCallback(
    async (e) => {
      e.preventDefault();
      const { email, password } = e.target.elements;

      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (err) {
        alert(err);
      }
    },
    [history]
  );

  return (
    <div>
      <div className='bg-grey-lighter my-10  flex flex-col'>
        <form
          onSubmit={handleSignIn}
          className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'
        >
          <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
            <h1 className='mb-8 text-3xl text-center'>Sign In</h1>

            <input
              type='text'
              className='block border border-grey-light w-full p-3 rounded mb-4'
              name='email'
              placeholder='Email'
            />

            <input
              type='password'
              className='block border border-grey-light w-full p-3 rounded mb-4'
              name='password'
              placeholder='Password'
            />

            <button
              type='submit'
              className='w-full text-center py-3 rounded bg-purple-500 text-white hover:bg-purple-600
               focus:outline-none my-1 transition-colors'
            >
              Login
            </button>
          </div>

          <div className='text-grey-dark mt-6'>
            Don't have an account?
            <Link
              className='no-underline border-b border-blue text-blue'
              to='/signup'
            >
              <strong className='text-purple-600'> Sign up.</strong>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
