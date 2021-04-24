import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Auth";
import { fetchPosts } from "../../services/postHandler";
import { getUserData } from "../../services/userDataHandler";
import { ACTIONS } from "../../reducers/reducers";
import Post from "../../components/post/Post";
import "./MyPosts.css";

const MyPosts = ({ dispatch, manageLoader, postData }) => {
  const [userData, setUserData] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;

    manageLoader(true);

    getUserData(currentUser.uid).then((data) => {
      const myPosts = data?.userPosts;

      fetchPosts().then((posts) => {
        const filteredposts = posts.filter((post) =>
          myPosts.includes(post.postId)
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
  }, [dispatch, manageLoader, currentUser]);

  return (
    <div className="my-posts-ctn">
      <h1>My Posts</h1>
      <span className="borderline"></span>

      <Post
        currentUser={currentUser}
        dispatch={dispatch}
        postData={postData}
        userData={userData}
      />
    </div>
  );
};

export default MyPosts;
