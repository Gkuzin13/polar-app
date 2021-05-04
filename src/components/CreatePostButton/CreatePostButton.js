import { Link } from "react-router-dom";
import "./CreatePostButton.css";

const CreatePostButton = () => {
  return (
    <Link class="create-post-btn" to="/create">
      <span>Create Post</span>
    </Link>
  );
};

export default CreatePostButton;
