import { useEffect, useState } from "react";
import { fetchPosts } from "../services/postHandler";
import groupList from "../groups";
import { ACTIONS } from "../reducers/reducers";
import AddPostButton from "./AddPostButton";

const GroupList = ({ dispatch }) => {
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
    <div className="w-full flex mx-1">
      <select
        value={value}
        onChange={(e) => onValuechange(e)}
        className="w-full p-2 cursor-pointer rounded font-semibold"
      >
        {groupList.map((group, i) => {
          return (
            <option value={group} key={i}>
              {`/${group}`}
            </option>
          );
        })}
      </select>
      <AddPostButton />
    </div>
  );
};

export default GroupList;
