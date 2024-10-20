import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";

const Register = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
    };
    try {
      const response = await registerUser(data).unwrap();
      alert("user registed successfull");
      navigate("/");
      // console.log(response);
    } catch (error) {
      setMessage("please enter a valid email, username and password");
    }
    // console.log(data);
  };
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Please Register</h2>
        <form
          className="space-y-5 max-w-sm mx-auto pt-8"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Email Password"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {message && <p className="text-red-500">{message}</p>}
          <button
            type="submit"
            className="w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded"
          >
            Register
          </button>
        </form>
        <p className="my-5 italic text-sm text-center">
          Have an account ? Please{" "}
          <Link to="/login" className="text-red-700 px-1 underline">
            Login
          </Link>{" "}
          here.
        </p>
      </div>
    </section>
  );
};

export default Register;