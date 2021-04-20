import { useEffect } from "react";
import Post from "../components/Post";
import PostComment from "../components/PostComment";
import CommentMaker from "../components/CommentMaker";
import { fetchCurrentPost } from "../services/postHandler";
import Loader from "../components/Loader";
import { ACTIONS } from "../reducers/reducers";

const CommentsView = ({
  setSignUpWindow,
  dispatch,
  postData,
  currentUser,
  userData,
  match,
  manageLoader,
  loading,
}) => {
  const { postId } = match.params;

  useEffect(() => {
    let isMounted = true;
    manageLoader(true);

    fetchCurrentPost(postId).then((post) => {
      if (isMounted) {
        dispatch({
          type: "setdata",
          data: [post],
        });
        manageLoader(false);
      }
    });

    return () => {
      isMounted = false;

      dispatch({
        type: ACTIONS.SET_DATA,
        data: [],
      });
    };
  }, []);

  const updatePostData = () => {
    fetchCurrentPost(postId).then((post) => {
      dispatch({
        type: "setdata",
        data: [post],
      });
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Post
        currentUser={currentUser}
        postData={postData}
        userData={userData}
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
      <PostComment currentPost={postData} />
    </div>
  );
};

export default CommentsView;
