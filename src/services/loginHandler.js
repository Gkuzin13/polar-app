import app from "../firebase/firebase";

const loginHandler = async (email, password) => {
  try {
    await app.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    return err;
  }
};

export default loginHandler;
