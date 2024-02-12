import { useState } from "react";

import firebaseApp from "../../firebase.config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebaseApp);

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginEmailPassword = async () => {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredentials.user);
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
      <button type="submit" onClick={loginEmailPassword}>
        Log in
      </button>
    </>
  );
};

export default Auth;
