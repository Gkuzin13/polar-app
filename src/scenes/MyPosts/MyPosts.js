import { useEffect, useState } from 'react';
import { fetchUserPosts } from '../../services/postHandler';
import { ACTIONS } from '../../reducers/reducers';
import Post from '../../components/Post/Post';
import './MyPosts.css';
import Loader from '../../components/Loader/Loader';
import { getUserData } from '../../services/userDataHandler';

const MyPosts = ({ dispatch, postData, manageLoginWindow, currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    getUserData(currentUser.uid).then((data) => {
      setUserData(data);

      fetchUserPosts(currentUser.uid).then((posts) => {
        if (posts) {
          dispatch({
            type: ACTIONS.SET_DATA,
            data: posts,
          });
        }
        setIsLoading(false);
      });
    });

    return () => {
      dispatch({
        type: ACTIONS.SET_DATA,
        data: [],
      });
    };
  }, [dispatch, currentUser]);

  return (
    <div className='my-posts-ctn'>
      <h1 className='myposts-heading'>My Posts</h1>
      <div className='border-ctn'>
        <span className='borderline'></span>
      </div>
      {!postData.length && !isLoading && (
        <span className='no-posts'>Empty here.. :(</span>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        postData.map((post) => {
          return (
            <Post
              key={post.postId}
              currentUser={currentUser}
              dispatch={dispatch}
              post={post}
              userData={userData}
              manageLoginWindow={manageLoginWindow}
            />
          );
        })
      )}
    </div>
  );
};

export default MyPosts;
