import PostMaker from "../components/postMaker/PostMaker";

const CreateNewPost = ({ currentUser }) => {
  return (
    <>
      <PostMaker currentUser={currentUser} />
    </>
  );
};

export default CreateNewPost;
