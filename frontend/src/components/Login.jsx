import React, { useState } from "react";
import { useLoginUserMutation } from "../api/userApi";
import Loader from "./Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser({ email, password });
    console.log(result);
  };

  if (isLoading) return <Loader />;
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <form className="loginForm" onSubmit={loginSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
