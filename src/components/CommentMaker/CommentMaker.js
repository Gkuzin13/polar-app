import { useState } from "react";
import { pushCommentToDb } from "../../services/commentHandler";
import { v4 as uuid } from "uuid";
import Loader from "../Loader/Loader";
import "./CommentMaker.css";

const CommentMaker = ({ currentUser, postId, updatePostData }) => {
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (value) => {
    setTextInput(value);
  };

  const handleNewComment = (currentUser, content) => {
    if (!textInput.length) {
      return;
    }
    setLoading(true);

    const newCommentId = uuid();

    const newComment = {
      commentOwnerUid: currentUser.uid,
      commentOwnerName: currentUser.displayName,
      content: content,
      commentId: newCommentId,
      commentDate: Date.now(),
    };

    pushCommentToDb(newComment, postId, newCommentId).then(() => {
      updatePostData();
      setTextInput("");
      setLoading(false);
    });
  };

  return (
    <form className="comment-maker-ctn">
      <label htmlFor="comment">
        Comment as{" "}
        <span className="comment-username">{currentUser?.displayName}</span>
      </label>

      <textarea
        className="comment-maker-text"
        name="comment"
        rows="5"
        cols="33"
        placeholder="What are your thoughts?"
        value={textInput}
        required
        onChange={(e) => handleInput(e.target.value)}
      />

      <div className="comment-maker-btn">
        <button
          type="submit"
          onClick={() => handleNewComment(currentUser, textInput)}
        >
          {loading ? <Loader /> : "Comment"}
        </button>
      </div>
    </form>
  );
};

export default CommentMaker;
