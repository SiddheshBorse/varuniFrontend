import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase";


const firebaseSignup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

const firebaseSignin = (email, password) => { 
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        const user = userCredential.user;
        const token = await user.getIdToken(true);
        // console.log(user.uid);
        // console.log(user.getIdToken(true));
        // console.log(user.getIdTokenResult(true));
        resolve(user); // Resolve the promise with the user object
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        reject(error); // Reject the promise with the error object
      });
  });
}
export { firebaseSignin,firebaseSignup}