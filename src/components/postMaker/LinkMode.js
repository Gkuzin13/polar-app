const LinkMode = ({ values, handleInputChange, submitNewPost }) => {
  return (
    <div className="link-mode-ctn">
      <div className="link-input-ctn">
        <input
          onChange={(e) => handleInputChange(e)}
          type="url"
          name="postContentUrl"
          placeholder="Url"
          pattern="https://.*"
          size="30"
          required
        ></input>
      </div>
      <div className="post-submit-ctn">
        <button
          type="button"
          className="post-submit-btn"
          onClick={submitNewPost}
          disabled={
            values.postTitle === "" || values.postContentUrl === ""
              ? true
              : false
          }
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default LinkMode;
