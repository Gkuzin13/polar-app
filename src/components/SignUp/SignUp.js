import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import Loader from '../Loader/Loader';
import { createNewUser } from '../../services/signUpHandler';
import { XIcon } from '@heroicons/react/solid';
import './SignUp.css';

const SignUp = ({ manageLoginWindow, manageSignUpWindow, currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    manageSignUpWindow(true);

    if (currentUser) {
      manageSignUpWindow(false);
      return <Redirect to='/' />;
    }

    return () => {
      manageSignUpWindow(false);
    };
  }, [currentUser, manageSignUpWindow]);

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const { email, password, confirmpassword, nickname } = e.target.elements;

    if (password.value !== confirmpassword.value) {
      setErrorMsg('The passwords do not match. Try again.');
      setIsLoading(false);
      return;
    }

    createNewUser(email, password, nickname).then((res) => {
      if (res?.message) {
        setErrorMsg(res.message);
        setIsLoading(false);
      }
    });
  };

  return (
    <div className='form-window-ctn'>
      <div className='window-inner-ctn'>
        <div className='window-exit-ctn'>
          <XIcon
            className='exit-icon'
            onClick={() => manageSignUpWindow(false)}
          />
        </div>
        <form className='form-ctn' onSubmit={(e) => handleSignUp(e)}>
          <h1>Sign Up</h1>
          <input type='text' name='nickname' placeholder='Nickname' required />
          <input type='text' name='email' placeholder='Email' required />
          <input
            type='password'
            name='password'
            placeholder='Password'
            required
          />
          <input
            type='password'
            name='confirmpassword'
            placeholder='Confirm Password'
            required
          />
          {errorMsg ? <span className='error-msg'>{errorMsg}</span> : null}

          {isLoading ? (
            <Loader />
          ) : (
            <button type='submit' className='form-btn'>
              Sign Up
            </button>
          )}

          <div className='form-footer-ctn'>
            Already have an account?
            <strong onClick={() => manageLoginWindow(true)}> Log in</strong>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
