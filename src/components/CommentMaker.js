import { useState } from "react";
import { pushCommentToDb } from "../services/commentHandler";
import { v4 as uuid } from "uuid";
import Loader from "./Loader";

const CommentMaker = ({ currentUser, postId, updatePostData }) => {
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (value) => {
    setTextInput(value);
  };

  const handleNewComment = (currentUser, content) => {
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
    <div className="flex flex-col mx-2 mt-7">
      <label htmlFor="comment">
        Comment as{" "}
        <span className="font-semibold text-indigo-500">
          {currentUser?.displayName}
        </span>
      </label>
      <textarea
        className="border-gray-300 border-2 p-2 mt-1 resize-none"
        name="comment"
        rows="5"
        cols="33"
        placeholder="What are your thoughts?"
        value={textInput}
        onChange={(e) => handleInput(e.target.value)}
      ></textarea>
      <div className="p-2 bg-gray-100">
        <button
          onClick={() => handleNewComment(currentUser, textInput)}
          className="bg-purple-500 hover:bg-purple-600 text-white 
            font-semibold py-2 px-3 mr-3 rounded transition-colors"
        >
          {loading ? <Loader /> : "Comment"}
        </button>
      </div>
    </div>
  );
};

export default CommentMaker;
