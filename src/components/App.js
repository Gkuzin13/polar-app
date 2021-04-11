import React, { useReducer, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { reducer } from '../reducers/reducers';
import { db } from '../firebase/firebase';
import Post from './Post';
import Navbar from './Navbar';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { AuthProvider } from '../Auth';
import { v4 as uuid } from 'uuid';

const App = () => {
  const [data, dispatch] = useReducer(reducer, []);
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
        <Navbar />
        <Switch>
          <Route
            path='/signup'
            render={() => <SignUp loading={loading} setLoading={setLoading} />}
          />
          <Route
            path='/signin'
            render={() => <SignIn loading={loading} setLoading={setLoading} />}
          />
        </Switch>
        {[...data].map((data, i) => {
          return <Post key={i} dispatch={dispatch} data={data} />;
        })}
      </Router>
    </AuthProvider>
  );
};

export default App;
