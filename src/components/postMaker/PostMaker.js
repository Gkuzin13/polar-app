import { useState } from "react";
import { Redirect } from "react-router-dom";
import { pushNewPostToDb } from "../../services/postHandler";
import { v4 as uuid } from "uuid";
import "./PostMaker.css";
import groupList from "../../groups";

const initialState = {
  postContent: "",
  postTitle: "",
  postSubGroup: "all",
  postContentType: "text",
};

const PostMaker = ({ currentUser }) => {
  const [values, setValues] = useState(initialState);
  const [submited, setSubmited] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const submitNewPost = () => {
    const newPost = {
      ...values,
      postId: uuid(),
      postDate: Date.now(),
      postOwnerId: currentUser.uid,
      postOwner: currentUser.displayName,
      postVotes: 0,
      postComments: [],
    };

    pushNewPostToDb(newPost);

    setValues(initialState);

    setSubmited(true);
  };

  if (submited) {
    return <Redirect to="/" />;
  }

  return (
    <div className="post-maker-ctn">
      <div>
        <select
          className="group-select-ctn"
          onChange={(e) => handleInputChange(e)}
          value={values.postSubGroup}
          name="postSubGroup"
        >
          {groupList.map((group, i) => {
            return (
              <option key={i} placeholder="Choose a group">
                {`/${group}`}
              </option>
            );
          })}
        </select>
      </div>
      <div className="post-options-ctn">
        <button
          style={values.postContentType === "text" ? { color: "purple" } : null}
          className="options-btn"
          onClick={() =>
            setValues({
              ...values,
              postContentType: "text",
            })
          }
        >
          Post
        </button>
        <button
          style={
            values.postContentType === "media" ? { color: "purple" } : null
          }
          className="options-btn"
          onClick={() =>
            setValues({
              ...values,
              postContentType: "media",
            })
          }
        >
          Images {"&"} Video
        </button>
        <button
          style={values.postContentType === "link" ? { color: "purple" } : null}
          className="options-btn"
          onClick={() =>
            setValues({
              ...values,
              postContentType: "link",
            })
          }
        >
          Link
        </button>
      </div>

      <div className="title-ctn">
        <input
          placeholder="Title"
          value={values.postTitle}
          name="postTitle"
          onChange={(e) => handleInputChange(e)}
        ></input>
      </div>
      <div className="text-ctn">
        <textarea
          name="postContent"
          rows="5"
          cols="33"
          placeholder="Text (Optional)"
          value={values.postContent}
          onChange={(e) => handleInputChange(e)}
        ></textarea>
      </div>
      <div className="post-submit-ctn">
        <button
          type="button"
          className="post-submit-btn"
          onClick={submitNewPost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostMaker;
