import { useEffect, useState } from 'react';
import Post from '../../components/Post/Post';
import PostComment from '../../components/PostComment/PostComment';
import CommentMaker from '../../components/CommentMaker/CommentMaker';
import { fetchCurrentPost } from '../../services/postHandler';
import { getUserData } from '../../services/userDataHandler';
import { ACTIONS } from '../../reducers/reducers';
import Loader from '../../components/Loader/Loader';
import './CommentsView.css';

const CommentsView = ({
  manageLoginWindow,
  dispatch,
  postData,
  match,
  manageLoader,
  loading,
  currentUser,
}) => {
  const [userData, setUserData] = useState([]);

  const postId = match.params.postId;

  useEffect(() => {
    manageLoader(true);

    fetchCurrentPost(postId).then((post) => {
      if (currentUser) {
        getUserData(currentUser?.uid).then((data) => {
          setUserData(() => data);
        });
      }

      dispatch({
        type: ACTIONS.SET_DATA,
        data: [post],
      });

      manageLoader(false);
    });

    return () => {
      manageLoader(false);
      dispatch({
        type: ACTIONS.SET_DATA,
        data: [],
      });
    };
  }, [dispatch, postId, manageLoader, currentUser]);

  const updatePostData = () => {
    fetchCurrentPost(postId).then((post) => {
      dispatch({
        type: ACTIONS.SET_DATA,
        data: [post],
      });
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='comments-view-ctn'>
      <Post
        currentUser={currentUser}
        postData={postData}
        userData={userData}
        dispatch={dispatch}
        manageLoginWindow={manageLoginWindow}
      />

      {currentUser && (
        <CommentMaker
          currentUser={currentUser}
          postId={postId}
          updatePostData={updatePostData}
        />
      )}

      <div className='border-ctn'>
        <span className='borderline'></span>
      </div>

      <PostComment currentPost={postData} />
    </div>
  );
};

export default CommentsView;
