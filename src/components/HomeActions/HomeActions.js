import { useEffect, useState } from "react";
import { fetchPosts } from "../../services/postHandler";
import groupList from "../../groups";
import { ACTIONS } from "../../reducers/reducers";
import "./HomeActions.css";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const HomeActions = ({ dispatch, currentUser, windowSize, manageLoader }) => {
  const [value, setValue] = useState("all");

  useEffect(() => {
    const filterPosts = () => {
      fetchPosts().then((posts) => {
        const filteredPosts = posts.filter(
          (post) => post.postSubGroup === value
        );

        dispatch({
          type: ACTIONS.SET_DATA,
          data: value === "all" ? posts : filteredPosts,
        });
      });

      manageLoader(false);
    };

    filterPosts();

    return () => {
      dispatch({
        type: ACTIONS.SET_DATA,
        data: [],
      });
    };
  }, [value, dispatch, manageLoader]);

  const onValuechange = (e) => {
    setValue(() => e.target.value);
    manageLoader(true);
  };

  if (windowSize?.width > 600) {
    return (
      <Sidebar
        onValuechange={onValuechange}
        value={value}
        groupList={groupList}
        currentUser={currentUser}
      />
    );
  }

  return (
    <div className="home-actions-ctn">
      <div className="group-select">
        <select
          aria-label="Select a group"
          value={value}
          onChange={(e) => onValuechange(e)}
        >
          {groupList.map((group, i) => {
            return (
              <option value={group} key={i}>
                {`/${group}`}
              </option>
            );
          })}
        </select>
      </div>

      {currentUser ? (
        <div>
          <Link to="/create">
            <button type="button" className="add-post-btn">
              Create Post
            </button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default HomeActions;
