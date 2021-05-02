import { useEffect, useState } from "react";
import { fetchPosts } from "../../services/postHandler";
import groupList from "../../groups";
import { ACTIONS } from "../../reducers/reducers";
import Sidebar from "../Sidebar/Sidebar";
import CreatePostButton from "../CreatePostButton/CreatePostButton";
import "./GroupSelect.css";

const HomeActions = ({
  dispatch,
  windowSize,
  manageLoader,
  loading,
  currentUser,
}) => {
  const [value, setValue] = useState("all");

  useEffect(() => {
    const filterPosts = () => {
      manageLoader(true);

      fetchPosts().then((posts) => {
        const filteredPosts = posts.filter(
          (post) => post.postSubGroup === value
        );

        dispatch({
          type: ACTIONS.SET_DATA,
          data: value === "all" ? posts : filteredPosts,
        });

        manageLoader(false);
      });
    };

    filterPosts();

    return () => {
      manageLoader(false);

      dispatch({
        type: ACTIONS.SET_DATA,
        data: [],
      });
    };
  }, [value, dispatch, manageLoader]);

  const onValuechange = (e) => {
    setValue(() => e.target.value);
  };

  if (windowSize?.width > 600) {
    return (
      <Sidebar
        onValuechange={onValuechange}
        value={value}
        groupList={groupList}
        currentUser={currentUser}
        loading={loading}
      />
    );
  }

  return (
    <div className="group-select-main-ctn">
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

      {currentUser && <CreatePostButton />}
    </div>
  );
};

export default HomeActions;
