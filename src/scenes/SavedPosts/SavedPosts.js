import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Auth";
import { fetchPosts } from "../../services/postHandler";
import { getUserData } from "../../services/userDataHandler";
import { ACTIONS } from "../../reducers/reducers";
import Post from "../../components/post/Post";
import "./SavedPosts.css";
import Loader from "../../components/Loader/Loader";

const SavedPosts = ({
  dispatch,
  manageLoader,
  postData,
  manageLoginWindow,
  loading,
}) => {
  const [userData, setUserData] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;

    manageLoader(true);

    getUserData(currentUser.uid).then((data) => {
      const savedPosts = data.userSavedPosts;

      fetchPosts().then((posts) => {
        const filteredposts = posts.filter((post) =>
          savedPosts.includes(post.postId)
        );

        if (isMounted) {
          dispatch({
            type: ACTIONS.SET_DATA,
            data: filteredposts,
          });
          manageLoader(() => false);
        }
      });
    });

    getUserData(currentUser.uid).then((data) => {
      setUserData(() => data);
    });

    return () => {
      isMounted = false;

      dispatch({
        type: ACTIONS.SET_DATA,
        data: [],
      });
    };
  }, [dispatch, manageLoader, currentUser]);

  return (
    <div className="saved-posts-ctn">
      <h1 className="savedposts-heading">My Saved Posts</h1>

      <div className="border-ctn">
        <span className="borderline"></span>
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

export default SavedPosts;
