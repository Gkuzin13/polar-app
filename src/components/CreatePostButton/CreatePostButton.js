import { Link } from "react-router-dom";
import "./CreatePostButton.css";

const CreatePostButton = () => {
  return (
    <div className="add-post-btn">
      <Link to="/create">
        <span>Create Post</span>
      </Link>
    </div>
  );
};

export default CreatePostButton;
