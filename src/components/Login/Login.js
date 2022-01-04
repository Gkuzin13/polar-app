import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import loginHandler from '../../services/loginHandler';
import Loader from '../Loader/Loader';
import { XIcon } from '@heroicons/react/solid';
import './Login.css';

const Login = ({ manageSignUpWindow, manageLoginWindow, currentUser }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    manageLoginWindow(true);

    if (currentUser) {
      manageLoginWindow(false);
      return <Redirect to='/' />;
    }
    return () => {
      manageLoginWindow(false);
    };
  }, [manageLoginWindow, currentUser]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const { email, password } = e.target.elements;

    loginHandler(email.value, password.value).then((res) => {
      if (res?.message) {
        setErrorMsg(res.message);
        setIsLoading(false);
      }
    });
  };

  const testDriveLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const { email, password } = {
      email: 'tester@mail.com',
      password: 'tester',
    };

    loginHandler(email, password).then((res) => {
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
            onClick={() => manageLoginWindow(false)}
          />
        </div>
        <form onSubmit={handleLogin} className='form-ctn'>
          <h1>Log In</h1>
          <input type='text' name='email' placeholder='Email' required />
          <input
            type='password'
            name='password'
            placeholder='Password'
            required
          />

          {errorMsg && <span className='error-msg'>{errorMsg}</span>}

          {isLoading ? (
            <Loader />
          ) : (
            <button type='submit' className='form-btn'>
              Log In
            </button>
          )}

          <div className='form-footer-ctn'>
            New to this website?
            <strong onClick={() => manageSignUpWindow(true)}> Sign Up</strong>
          </div>
        </form>
        <div className='form-footer-ctn'>
          <button
            onClick={(e) => testDriveLogin(e)}
            className='login-test-btn'
            type='button'>
            Log in as guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
