import app from '../firebase/firebase';

const loginHandler = async (email, password) => {
  try {
    await app.auth().signInWithEmailAndPassword(email.value, password.value);
  } catch (err) {
    alert(err);
  }
};

export default loginHandler;
