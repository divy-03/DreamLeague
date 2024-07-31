import React, { useState } from "react";
import { useAddUserMutation } from "../api/userApi";
import Loader from "./Loader";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const dataChange = (e) => {
    if (e.target.name === "avatar" && e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result });
      };
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const [addUser, { isLoading }] = useAddUserMutation();
  const registerUser = async (e) => {
    e.preventDefault();
    const result = await addUser(user);
    console.log(result);
  };

  if (isLoading) return <Loader />;
  return (
    <div className="registerContainer">
      <div className="registerBox">
        <form className="registerForm" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={dataChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            name="email"
            autoComplete="email"
            onChange={dataChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            autoComplete="current-password"
            onChange={dataChange}
            required
          />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={dataChange}
          />

          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Register;
