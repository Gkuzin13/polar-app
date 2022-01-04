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
  currentUser,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  const postId = match.params.postId;

  useEffect(() => {
    setIsLoading(true);
    if (currentUser) {
      getUserData(currentUser?.uid).then((data) => {
        setUserData(() => data);
      });
    }
    fetchCurrentPost(postId).then((post) => {
      dispatch({
        type: ACTIONS.SET_DATA,
        data: [post],
      });

      setIsLoading(false);
    });

    return () => {
      setIsLoading(false);
      dispatch({
        type: ACTIONS.SET_DATA,
        data: [],
      });
    };
  }, [dispatch, postId, currentUser]);

  const updatePostData = () => {
    fetchCurrentPost(postId).then((post) => {
      dispatch({
        type: ACTIONS.SET_DATA,
        data: [post],
      });
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='comments-view-ctn'>
      {postData.map((post) => {
        return (
          <Post
            key={post.postId}
            currentUser={currentUser}
            post={post}
            userData={userData}
            dispatch={dispatch}
            manageLoginWindow={manageLoginWindow}
          />
        );
      })}

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
