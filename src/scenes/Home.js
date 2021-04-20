import { useEffect } from "react";
import { fetchPosts } from "../services/postHandler";
import { ACTIONS } from "../reducers/reducers";
import Post from "../components/Post";
import GroupList from "../components/GroupList";
import Loader from "../components/Loader";

const Home = ({
  setSignUpWindow,
  dispatch,
  postData,
  userData,
  currentUser,
  manageLoader,
  loading,
}) => {
  useEffect(() => {
    let isMounted = true;
    manageLoader(true);
    fetchPosts().then((posts) => {
      if (isMounted) {
        dispatch({
          type: ACTIONS.SET_DATA,
          data: posts,
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <GroupList />

      <Post
        currentUser={currentUser}
        dispatch={dispatch}
        postData={postData}
        userData={userData}
        setSignUpWindow={setSignUpWindow}
      />
    </div>
  );
};

export default Home;
