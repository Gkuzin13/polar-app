import "./PostSorter.css";
import { ACTIONS } from "../../reducers/reducers";
import { fetchPosts } from "../../services/postHandler";
import { useState } from "react";
import { ChartBarIcon, StarIcon } from "@heroicons/react/solid";

const PostSorter = ({ dispatch, manageLoader }) => {
  const [sortBy, setSortBy] = useState({ top: false, new: true });

  const sortByTop = () => {
    manageLoader(true);

    setSortBy((prevSort) => ({
      top: !prevSort.top,
      new: !prevSort.new,
    }));

    fetchPosts().then((posts) => {
      dispatch({
        type: ACTIONS.SORT_POST_BY_TOP,
        data: posts,
      });

      manageLoader(false);
    });
  };

  const sortByNew = () => {
    manageLoader(true);

    setSortBy((prevSort) => ({
      top: !prevSort.top,
      new: !prevSort.new,
    }));

    fetchPosts().then((posts) => {
      dispatch({
        type: ACTIONS.SORT_POST_BY_NEW,
        data: posts,
      });

      manageLoader(false);
    });
  };
  return (
    <div className="post-sorter-ctn">
      <label>Sort by: </label>

      <button
        className={
          sortBy.new ? "post-sort-btn active-sort-btn" : "post-sort-btn"
        }
        onClick={() => sortByNew()}
      >
        <div className="icon-ctn">
          <StarIcon className="icon star-icon" />
        </div>
        <span>New</span>
      </button>
      <button
        className={
          sortBy.top ? "post-sort-btn active-sort-btn" : "post-sort-btn"
        }
        onClick={() => sortByTop()}
      >
        <div className="icon-ctn">
          <ChartBarIcon className="icon chart-icon" />
        </div>
        <span>Top</span>
      </button>
    </div>
  );
};

export default PostSorter;
