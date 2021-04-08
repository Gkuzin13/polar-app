import React, { useReducer } from 'react';
import Post from './components/Post';
import { reducer } from './reducers/reducers';

const data = [
  {
    postId: Date.now() + 2,
    postVotes: 0,
    votedByUser: false,
    comments: 12,
    postOwner: 'Criminal102',
    postDate: 9,
    postSubGroup: '/pics',
    postContent: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text ever
    since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book. It has survived not only five
    centuries, but also the leap into electronic typesetting.`,
  },
  {
    postId: Date.now() + 5,
    postVotes: 65,
    votedByUser: false,
    comments: 837,
    postOwner: 'JessicaPl2',
    postDate: 23,
    postSubGroup: '/videos',
    postContent: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the indpesetting.`,
  },
];

const App = () => {
  const [postData, dispatch] = useReducer(reducer, data);

  return (
    <div>
      {[...postData].map((data, i) => {
        return <Post key={i} dispatch={dispatch} data={data} />;
      })}
    </div>
  );
};

export default App;
