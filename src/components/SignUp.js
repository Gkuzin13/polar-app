import React, { useContext } from 'react';
import { Redirect, withRouter } from 'react-router';
import app, { db } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth';
import { XIcon } from '@heroicons/react/solid';
import Loader from './Loader';

const SignUp = ({
  loading,
  manageLoader,
  manageSignUpWindow,
  signUpWindow,
}) => {
  const { currentUser } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { email, password, confirmpassword, nickname } = e.target.elements;

    if (password.value !== confirmpassword.value) {
      return;
    }

    manageLoader(true);

    try {
      await (
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
      ).user.updateProfile({ displayName: nickname.value });

      manageLoader(false);
    } catch (err) {
      alert(err);
      manageLoader(false);
    }
  };

  const pushNewUserToDb = async (id, email, nickname) => {
    try {
      await db.ref('users/' + id).set({
        userUid: id,
        userEmail: email,
        userNickname: nickname,
      });
    } catch (err) {
      alert(err);
    }
  };

  if (currentUser) {
    pushNewUserToDb(
      currentUser.uid,
      currentUser.email,
      currentUser.displayName
    );

    return <Redirect to='/' />;
  }

  return (
    <div>
      <div className='bg-grey-lighter my-10  flex flex-col'>
        <div className='m-4 flex justify-end items-center'>
          <XIcon
            onClick={() => manageSignUpWindow(false)}
            className='w-8 h-8  cursor-pointer text-gray-500 
            hover:text-gray-700 transition-colors'
          />
        </div>
        <form
          onSubmit={(e) => handleSignUp(e)}
          className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'
        >
          <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
            <h1 className='mb-8 text-3xl text-center'>Sign Up</h1>
            <input
              type='text'
              className='block border border-grey-light w-full p-3 rounded mb-4'
              name='nickname'
              placeholder='Nickname'
            />

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

            <input
              type='password'
              className='block border border-grey-light w-full p-3 rounded mb-4'
              name='confirmpassword'
              placeholder='Confirm Password'
            />

            <button
              type='submit'
              className='w-full text-center py-3 rounded bg-purple-500 text-white hover:bg-purple-600
               focus:outline-none my-1 transition-colors'
            >
              <div className='flex justify-center items-center'>
                {loading ? <Loader /> : 'Sign Up'}
              </div>
            </button>
          </div>

          <div className='text-grey-dark mt-6'>
            Already have an account?
            <span className='no-underline border-b border-blue text-blue cursor-pointer'>
              <strong className='text-purple-600'> Sign In</strong>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
