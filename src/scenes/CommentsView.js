import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Auth";
import Post from "../components/post/Post";
import PostComment from "../components/postComment/PostComment";
import CommentMaker from "../components/CommentMaker/CommentMaker";
import { fetchCurrentPost } from "../services/postHandler";
import { getUserData } from "../services/userDataHandler";
import { ACTIONS } from "../reducers/reducers";
import Loader from "../components/Loader/Loader";
import "./CommentsView.css";

const CommentsView = ({
  manageLoginWindow,
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
      }
    });

    getUserData(currentUser?.uid).then((data) => {
      if (isMounted) {
        setUserData(() => data);
        manageLoader(false);
      }
    });

    return () => {
      isMounted = false;

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
    <div className="comments-view-ctn">
      <Post
        currentUser={currentUser}
        postData={postData}
        userData={userData}
        dispatch={dispatch}
        manageLoginWindow={manageLoginWindow}
      />

      {currentUser ? (
        <CommentMaker
          currentUser={currentUser}
          postId={postId}
          updatePostData={updatePostData}
        />
      ) : null}

      <div className="border-ctn">
        <span className="borderline"></span>
      </div>

      <PostComment currentPost={postData} />
    </div>
  );
};

export default CommentsView;
