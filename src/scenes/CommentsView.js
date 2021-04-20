import { useEffect, useState } from "react";
import Post from "../components/Post";
import PostComment from "../components/PostComment";
import CommentMaker from "../components/CommentMaker";
import { fetchCurrentPost } from "../services/postHandler";

const CommentsView = ({
  setSignUpWindow,
  dispatch,
  postData,
  manageLoader,
  currentUser,
  match,
}) => {
  const [currentPost, setCurrentPost] = useState([]);

  const { postId } = match.params;

  useEffect(() => {
    const getCurrentPost = () => {
      fetchCurrentPost(postId).then((post) => {
        setCurrentPost(() => [post]);
      });
    };

    getCurrentPost();
  }, [postId]);

  const updatePostData = () => {
    fetchCurrentPost(postId).then((post) => {
      setCurrentPost(() => [post]);
    });
  };

  return (
    <div>
      <Post
        currentUser={currentUser}
        postData={currentPost}
        dispatch={dispatch}
        setSignUpWindow={setSignUpWindow}
      />
      {currentUser ? (
        <CommentMaker
          currentUser={currentUser}
          postId={postId}
          updatePostData={updatePostData}
        />
      ) : null}
      <PostComment currentPost={currentPost} />
    </div>
  );
};

export default CommentsView;
