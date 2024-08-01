import React, { useState } from "react";
import { useLoginUserMutation } from "../api/userApi";
import Loader from "./Loader";
// import { useForm } from "react-hook-form";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser({ email, password });
    console.log(result);
  };

  const [showPass, setShowPass] = useState(false);

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="Logo flex flex-col items-center mt-5">
        <img
          src="https://res.cloudinary.com/djgwv8dck/image/upload/v1722521690/avatars/sprgdhkhf4rtler1yfal.png"
          alt="logo"
          className="h-24"
        />
        <p className="text-4xl dark:text-white">
          Dream <span className="italic">League</span>
        </p>
      </div>
      <form
        className="max-w-sm dark:bg-gray-800 py-5 my-3 mx-1 bg-white rounded-lg sm:mx-auto"
        onSubmit={loginSubmit}
      >
        <div className="text-center dark:text-white text-3xl font-bold italic">
          Login
        </div>
        <div className="mb-5 ml-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-2 max-sm:w-[90%] sm:w-[95%]"
            placeholder="name@flowbite.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5 ml-2">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type={showPass ? "text" : "password"}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-2 max-sm:w-[90%] sm:w-[95%]"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-start mb-5 ml-3">
          <div className="flex items-center h-5">
            <input
              id="showPassword"
              type="checkbox"
              value={showPass}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              onChange={() => {
                setShowPass(!showPass);
              }}
            />
          </div>
          <label
            htmlFor="showPassword"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Show Password
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 max-sm:w-[70%] text-center mx-auto flex justify-center"
        >
          Submit
        </button>
      </form>

      <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://res.cloudinary.com/djgwv8dck/image/upload/v1722521690/avatars/sprgdhkhf4rtler1yfal.png"
                className="h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                DreamLeague
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-5" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              DreamLeague
            </a>
            ™. All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Login;
