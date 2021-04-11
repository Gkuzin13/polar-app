import React, { useCallback, useContext } from 'react';
import { withRouter } from 'react-router';
import app, { db } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth';

const SignUp = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  const handleSignUp = useCallback(
    async (e) => {
      e.preventDefault();

      const { email, password, confirmpassword, nickname } = e.target.elements;

      if (password.value !== confirmpassword.value) {
        return;
      }

      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);

        await app.auth().currentUser.updateProfile({ displayName: '123' });

        if (currentUser) {
          await db.ref('users/' + currentUser.uid).set({
            userUid: currentUser.uid,
            userEmail: currentUser.email,
            userNickname: nickname.value,
          });
        }

        history.push('/');
      } catch (err) {
        alert(err);
      }
    },
    [history, currentUser]
  );

  return (
    <div>
      <div className='bg-grey-lighter my-10  flex flex-col'>
        <form
          onSubmit={handleSignUp}
          className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'
        >
          <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
            <h1 className='mb-8 text-3xl text-center'>Sign up</h1>
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
              Create Account
            </button>
          </div>

          <div className='text-grey-dark mt-6'>
            Already have an account?
            <Link
              className='no-underline border-b border-blue text-blue'
              to='/signin'
            >
              <strong className='text-purple-600'> Sign In</strong>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
