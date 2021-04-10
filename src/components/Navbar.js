import React, { useContext, useCallback } from 'react';
import { UserIcon } from '@heroicons/react/solid';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Auth';
import app from '../firebase/firebase';
import NavUser from './NavUser';

const Navbar = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  const handleSignOut = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        await app.auth().signOut();
      } catch (err) {
        alert(err);
      }
    },
    [history]
  );

  return (
    <nav className='flex w-full justify-between items-center px-8 py-3 mb-2 shadow-md static'>
      <NavLink to='/'>Logo</NavLink>
      <NavLink
        onClick={currentUser ? (e) => handleSignOut(e) : null}
        to='/signin'
        className='bg-purple-400 hover:bg-purple-500 text-white  py-2 px-4 rounded 
      inline-flex items-center transition-colors'
      >
        <UserIcon className='w-5 h-5 mr-2' />
        <span>{currentUser ? 'Sign Out' : 'Sign In'}</span>
      </NavLink>
      <NavUser />
    </nav>
  );
};

export default Navbar;
