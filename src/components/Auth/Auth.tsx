import { useEffect, useState } from "react";

import firebaseApp from "../../firebase.config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

const auth = getAuth(firebaseApp);

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpEmailPassword = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredentials.user);
    } catch (error) {
      console.log((error as FirebaseError).code === "auth/invalid-credential");
    }
  };

  const signInEmailPassword = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredentials.user);
    } catch (error) {
      console.log((error as FirebaseError).code === "auth/invalid-credential");
    }
  };

  const monitorAuthState = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        console.log("User logged in");
      } else {
        console.log("User not logged in");
      }
    });
  };

  monitorAuthState();

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <>
      <label>
        Email
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={signInEmailPassword}>
        Log in
      </button>
      <button type="submit" onClick={signUserOut}>
        Sign out
      </button>
    </>
  );
};

export default Auth;
