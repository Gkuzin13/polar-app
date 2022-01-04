import { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/postHandler';
import { getUserData } from '../../services/userDataHandler';
import { ACTIONS } from '../../reducers/reducers';
import Post from '../../components/Post/Post';
import './SavedPosts.css';
import Loader from '../../components/Loader/Loader';

const SavedPosts = ({ postData, dispatch, currentUser, manageLoginWindow }) => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getUserData(currentUser.uid).then((data) => {
      const savedPosts = data.userSavedPosts;

      setUserData(() => data);

      fetchPosts().then((posts) => {
        if (posts) {
          const filteredposts = posts.filter((post) =>
            savedPosts.includes(post.postId)
          );

          dispatch({
            type: ACTIONS.SET_DATA,
            data: filteredposts,
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
    <div className='saved-posts-ctn'>
      <h1 className='savedposts-heading'>My Saved Posts</h1>
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

export default SavedPosts;
