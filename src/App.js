import React, { useReducer, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import db from './firebase';
import Post from './components/Post';
import { reducer } from './reducers/reducers';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    db.ref('posts')
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          dispatch({ type: 'setdata', data: Object.values(snapshot.val()) });
        } else {
          console.log('oops');
        }
        setLoading(false);
      })

      .catch((err) => {
        console.log(err);
      });
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

  if (loading) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      {[...data].map((data, i) => {
        return <Post key={i} dispatch={dispatch} data={data} />;
      })}
    </div>
  );
};

export default App;
