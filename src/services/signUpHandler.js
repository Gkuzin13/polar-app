import app, { db } from '../firebase/firebase';

export const createNewUser = async (email, password, nickname) => {
  try {
    await (
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
    ).user.updateProfile({ displayName: nickname.value });
  } catch (err) {
    alert(err);
  }
};

export const pushNewUserToDb = async (id, email, nickname) => {
  try {
    await db.ref('users/' + id).set({
      userUid: id,
      userEmail: email,
      userNickname: nickname,
    });
  } catch (err) {
    alert(err);
  }
};
