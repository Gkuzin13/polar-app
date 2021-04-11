import React, { useContext } from 'react';
import { UserIcon } from '@heroicons/react/solid';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Auth';
import NavUser from './NavUser';

const Navbar = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav className='flex w-full justify-between items-center px-8 py-3 mb-2 shadow-md static'>
      <NavLink to='/'>Logo</NavLink>
      <NavLink
        to='/signin'
        className='bg-purple-400 hover:bg-purple-500 text-white  py-2 px-4 rounded 
      inline-flex items-center transition-colors'
        style={currentUser ? { display: 'none' } : null}
      >
        <UserIcon className='w-5 h-5 mr-2' />
        <span>Sign In</span>
      </NavLink>
      {currentUser ? <NavUser /> : null}
    </nav>
  );
};

export default Navbar;
