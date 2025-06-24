import React from "react";
import RegisterForm from "../components/auth/RegisterForm";

export default function Register() {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19] overflow-hidden">
      <div className="flex w-[1600px] mx-auto h-full">
        <RegisterForm />
      </div>
    </div>
  );
}