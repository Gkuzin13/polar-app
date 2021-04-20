const AddPostButton = () => {
  return (
    <div className="mx-2">
      <a href="/create">
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white 
        font-semibold py-2 px-10 rounded transition-colors"
        >
          Create Post
        </button>
      </a>
    </div>
  );
};

export default AddPostButton;
