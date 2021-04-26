import app from "../firebase/firebase";

const loginHandler = async (email, password) => {
  try {
    await app.auth().signInWithEmailAndPassword(email.value, password.value);
  } catch (err) {
    return err;
  }
};

export default loginHandler;
