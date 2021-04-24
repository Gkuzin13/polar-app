import { useEffect, useState } from "react";
import { fetchPosts } from "../../services/postHandler";
import groupList from "../../groups";
import { ACTIONS } from "../../reducers/reducers";
import "./HomeActions.css";
import { Link } from "react-router-dom";

const HomeActions = ({ dispatch, currentUser }) => {
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
    };

    filterPosts();

    return () => {
      dispatch({
        type: ACTIONS.SET_DATA,
        data: [],
      });
    };
  }, [value, dispatch]);

  const onValuechange = (e) => {
    setValue(() => e.target.value);
  };

  return (
    <div className="home-actions-ctn">
      <div className="group-select">
        <select value={value} onChange={(e) => onValuechange(e)}>
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
