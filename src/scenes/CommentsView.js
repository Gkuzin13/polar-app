import Post from '../components/Post';
import PostComment from '../components/PostComment';
import CommentMaker from '../components/CommentMaker';

const CommentsView = ({ setSignUpWindow, dispatch, postData, currentUser }) => {
  return (
    <div>
      <Post
        currentUser={currentUser}
        dispatch={dispatch}
        postData={postData}
        setSignUpWindow={setSignUpWindow}
      />
      <CommentMaker currentUser={currentUser} postData={postData} />
      <PostComment postData={postData} />
    </div>
  );
};

export default CommentsView;
