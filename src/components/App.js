import React, { useReducer, useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { reducer } from '../reducers/reducers';
import { AuthContext } from '../Auth';
import { fetchPosts } from '../services/postHandler';
import Post from './Post';
import Selection from './Selection';
import AddPostButton from './AddPostButton';
import Navbar from './Navbar';
import SignUp from './SignUp';
import Login from './Login';
import Loader from './Loader';
import { ACTIONS } from '../reducers/reducers';

const App = () => {
  const [postData, dispatch] = useReducer(reducer, []);
  const [loginWindow, setLoginWindow] = useState(false);
  const [signUpWindow, setSignUpWindow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);

    fetchPosts().then((posts) => {
      dispatch({
        type: ACTIONS.SET_DATA,
        data: posts,
      });
      setLoading(false);
    });
  }, []);

  const manageLoginWindow = (action) => {
    setLoginWindow(action);
  };

  const manageSignUpWindow = (action) => {
    setSignUpWindow(action);
  };

  const manageLoader = (action) => {
    setLoading(action);
  };

  return (
    <Router basename='/'>
      <Navbar
        signUpWindow={signUpWindow}
        loginWindow={loginWindow}
        manageLoginWindow={manageLoginWindow}
        manageSignUpWindow={manageSignUpWindow}
      />

      {loginWindow ? (
        <Login
          loginWindow={loginWindow}
          manageLoginWindow={manageLoginWindow}
          manageLoader={manageLoader}
          loading={loading}
        />
      ) : null}
      {signUpWindow ? (
        <SignUp
          signUpWindow={signUpWindow}
          manageSignUpWindow={manageSignUpWindow}
          manageLoader={manageLoader}
          loading={loading}
        />
      ) : null}

      {loading ? <Loader /> : null}

      <div>
        <div className='flex justify-between mx-1 mb-2 sticky'>
          <Selection />
          {currentUser ? <AddPostButton /> : null}
        </div>

        <div>
          <Post dispatch={dispatch} postData={postData} />
        </div>
      </div>
    </Router>
  );
};

export default App;
