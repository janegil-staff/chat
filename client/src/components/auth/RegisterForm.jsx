import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../features/user/userSlice";
import { useState } from "react";
import Picture from "./Picture";
import base64 from "base64-encode-file";
import AuthInput from "./AuthInput";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);
  const [picture, setPicture] = useState();
  const [readablePicture, setReadablePicture] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (picture) {
      let base64Image = await base64(picture);

      let res = await dispatch(
        registerUser({ ...formData, image: base64Image })
      );

      if (res?.payload?.user) {
        navigate("/");
      }
    } else {
      let res = await dispatch(registerUser({ ...formData}));
      if (res?.payload?.user) {
        navigate("/");
      }
    }
  };

  return (
    <div className="min-h-screen flex-1 flex items-center justify-center bg-gradient-to-r callbg p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <AuthInput
          name="name"
          type="text"
          placeholder="Username"
          handleChange={handleChange}
          error={error}
        />
        <AuthInput
          name="email"
          type="email"
          placeholder="Email"
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
        <AuthInput
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          handleChange={handleChange}
          error={error}
        />

        <Picture
          readablePicture={readablePicture}
          setReadablePicture={setReadablePicture}
          setPicture={setPicture}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 mt-4 text-white py-3 rounded hover:bg-blue-700 transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
