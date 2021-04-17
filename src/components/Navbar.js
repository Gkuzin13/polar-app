import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth';
import NavUser from './NavUser';

const Navbar = ({
  manageLoginWindow,
  manageSignUpWindow,
  loginWindow,
  signUpWindow,
}) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav
      className='flex w-full justify-between items-center px-8 py-3 mb-5 
    shadow-md static'
    >
      <Link to='/'>Logo</Link>

      <div className='text-sm flex justify-between items-center'>
        <button
          style={currentUser ? { display: 'none' } : null}
          onClick={() => manageLoginWindow(!loginWindow)}
          className='bg-gray-200 hover:bg-gray-300 text-black font-semibold 
          py-2 px-3 mr-3 rounded transition-colors'
        >
          Log In
        </button>

        <button
          style={currentUser ? { display: 'none' } : null}
          onClick={() => manageSignUpWindow(!signUpWindow)}
          className='bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-3 mr-3 rounded 
      transition-colors'
        >
          Sign Up
        </button>
        <NavUser />
      </div>
    </nav>
  );
};

export default Navbar;
