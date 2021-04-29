import PostMaker from "../components/PostMaker/PostMaker";

const CreateNewPost = ({ currentUser }) => {
  return (
    <>
      <PostMaker currentUser={currentUser} />
    </>
  );
};

export default CreateNewPost;
