import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import loginHandler from '../services/loginHandler';
import { AuthContext } from '../Auth';
import { XIcon } from '@heroicons/react/solid';
import Loader from './Loader';

const Login = ({ manageLoader, loading, manageLoginWindow }) => {
  const { currentUser } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    manageLoader(true);

    loginHandler(email, password).then(() => {
      manageLoader(false);
    });
  };

  if (currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <div className='absolute my-0 mx-auto w-full top-1/4'>
      <div className=' bg-white border-2 w-2/4  my-0 mx-auto'>
        <div className='m-4 flex justify-end items-center'>
          <XIcon
            onClick={() => manageLoginWindow(false)}
            className='w-8 h-8  cursor-pointer text-gray-500 
            hover:text-gray-700 transition-colors'
          />
        </div>
        <div className='bg-grey-lighter my-10  flex flex-col'>
          <form
            onSubmit={handleLogin}
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
                <div className='flex justify-center items-center'>
                  {loading ? <Loader /> : 'Sign In'}
                </div>
              </button>
            </div>

            <div className='text-grey-dark mt-6'>
              New to this website?
              <span className='no-underline border-b border-blue text-blue cursor-pointer'>
                <strong className='text-purple-600'> Sign up.</strong>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
