import React, { useReducer, useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { reducer } from '../reducers/reducers';
import { db } from '../firebase/firebase';
import Post from './Post';
import Navbar from './Navbar';
import SignUp from './SignUp';
import Login from './Login';
import { AuthProvider } from '../Auth';
import { v4 as uuid } from 'uuid';

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);
  const [loginWindow, setLoginWindow] = useState(false);
  const [signUpWindow, setSignUpWindow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await db
          .ref('posts')
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              dispatch({
                type: 'setdata',
                data: Object.values(snapshot.val()),
              });
            } else {
              console.log('oops');
            }
          });
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, []);

  const runReducer = (action, userId, postData) => {
    dispatch({
      type: action,
      payload: { id: postData.postId, user: userId },
    });
  };

  const manageLoginWindow = (action) => {
    setLoginWindow(action);
  };

  const manageSignUpWindow = (action) => {
    setSignUpWindow(action);
  };

  const manageLoader = (action) => {
    setLoading(action);
  };

  function writePostData(postContent, postId) {
    db.ref('posts/' + postId).set({
      postId: postId,
      postVotes: 0,
      votedByUser: false,
      comments: 0,
      postOwner: 'JessicaPl2',
      postDate: Date.now(),
      postSubGroup: '/videos',
      postContent: postContent,
    });
  }

  return (
    <AuthProvider>
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
        {[...data].map((data, i) => {
          return <Post key={i} runReducer={runReducer} data={data} />;
        })}
      </Router>
    </AuthProvider>
  );
};

export default App;
