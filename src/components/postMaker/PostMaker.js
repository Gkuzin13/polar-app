import { useState } from "react";
import { Redirect } from "react-router-dom";
import { pushNewPostToDb } from "../../services/postHandler";
import { v4 as uuid } from "uuid";
import "./PostMaker.css";
import groupList from "../../groups";
import TextMode from "./TextMode";
import LinkMode from "./LinkMode";

const initialState = {
  postContent: "",
  postContentUrl: "",
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

  console.log(values);

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
          className={
            values.postContentType === "text"
              ? "options-btn active-option"
              : "options-btn"
          }
          onClick={() =>
            setValues({
              ...values,
              postContentUrl: "",
              postContentType: "text",
            })
          }
        >
          Post
        </button>

        <button
          className={
            values.postContentType === "link"
              ? "options-btn active-option"
              : "options-btn"
          }
          onClick={() =>
            setValues({
              ...values,
              postContent: "",
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

      {values.postContentType === "text" ? (
        <TextMode
          values={values}
          handleInputChange={handleInputChange}
          submitNewPost={submitNewPost}
        />
      ) : null}

      {values.postContentType === "link" ? (
        <LinkMode
          values={values}
          handleInputChange={handleInputChange}
          submitNewPost={submitNewPost}
        />
      ) : null}
    </div>
  );
};

export default PostMaker;
