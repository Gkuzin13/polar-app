const TextMode = ({ values, handleInputChange, submitNewPost }) => {
  return (
    <div className="text-mode-ctn">
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
          disabled={values.postTitle === "" ? true : false}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default TextMode;
