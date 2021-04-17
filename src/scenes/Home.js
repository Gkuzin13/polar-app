import Post from '../components/Post';
import GroupList from '../components/GroupList';

const Home = ({ setSignUpWindow, dispatch, postData, currentUser }) => {
  return (
    <div>
      <GroupList />

      <Post
        currentUser={currentUser}
        dispatch={dispatch}
        postData={postData}
        setSignUpWindow={setSignUpWindow}
      />
    </div>
  );
};

export default Home;
