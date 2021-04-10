import React, { useContext } from 'react';
import { db } from '../firebase/firebase';
import { AuthContext } from '../Auth';

const NavUser = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return <div>hi</div>;
};

export default NavUser;
