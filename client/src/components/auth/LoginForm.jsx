import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import AuthInput from "./AuthInput";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await dispatch(loginUser({ ...formData }));

    console.log(res);
    if (res?.payload?.user) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex-1 flex items-center justify-center bg-gradient-to-r callbg p-6">
      {/* Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/*Heading*/}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-sm">Sign in</p>
        </div>
        {/*Form*/}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            handleChange={handleChange}
            error={error}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            handleChange={handleChange}
            error={error}
          />

          {/*if we have an error*/}
          {error ? (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          ) : null}
          {/*Submit button*/}
          <button
            type="submit"
            className="w-full bg-blue-600 mt-4 text-white py-3 rounded hover:bg-blue-700 transition duration-300"
          >
            Sign in
          </button>
          {/* Sign in link */}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>you do not have an account ?</span>
            <Link
              to="/register"
              className=" hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
