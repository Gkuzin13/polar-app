import { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/postHandler';
import { getUserData } from '../../services/userDataHandler';
import { ACTIONS } from '../../reducers/reducers';
import Post from '../../components/Post/Post';
import './MyPosts.css';
import Loader from '../../components/Loader/Loader';

const MyPosts = ({
  dispatch,
  manageLoader,
  postData,
  manageLoginWindow,
  loading,
  currentUser,
}) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    manageLoader(true);

    getUserData(currentUser.uid).then((data) => {
      const myPosts = data?.userPosts;
      setUserData(() => data);

      fetchPosts().then((posts) => {
        const filteredposts = posts.filter((post) =>
          myPosts.includes(post.postId)
        );

        dispatch({
          type: ACTIONS.SET_DATA,
          data: filteredposts,
        });
        manageLoader(false);
      });
    });

    return () => {
      dispatch({
        type: ACTIONS.SET_DATA,
        data: [],
      });
    };
  }, [dispatch, manageLoader, currentUser]);

  return (
    <div className='my-posts-ctn'>
      <h1 className='myposts-heading'>My Posts</h1>

      <div className='border-ctn'>
        <span className='borderline'></span>
      </div>

      {loading ? <Loader /> : null}

      <Post
        currentUser={currentUser}
        dispatch={dispatch}
        postData={postData}
        userData={userData}
        manageLoginWindow={manageLoginWindow}
      />
    </div>
  );
};

export default MyPosts;
