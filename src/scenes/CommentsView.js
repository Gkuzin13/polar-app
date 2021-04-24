import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Auth";
import Post from "../components/post/Post";
import PostComment from "../components/postComment/PostComment";
import CommentMaker from "../components/CommentMaker";
import { fetchCurrentPost } from "../services/postHandler";
import { getUserData } from "../services/userDataHandler";
import { ACTIONS } from "../reducers/reducers";

const CommentsView = ({
  setSignUpWindow,
  dispatch,
  postData,
  match,
  manageLoader,
  loading,
}) => {
  const [userData, setUserData] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const postId = match.params.postId;

  useEffect(() => {
    let isMounted = true;

    manageLoader(true);

    fetchCurrentPost(postId).then((post) => {
      if (isMounted) {
        dispatch({
          type: ACTIONS.SET_DATA,
          data: [post],
        });
        manageLoader(false);
      }
    });

    getUserData(currentUser?.uid).then((data) => {
      setUserData(() => data);
    });

    return () => {
      isMounted = false;

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
