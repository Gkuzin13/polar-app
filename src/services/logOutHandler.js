import app from "../firebase/firebase";

export const handleSignOut = async (e) => {
  e.preventDefault();

  try {
    await app.auth().signOut();
  } catch (err) {
    console.log(err);
  }
};
