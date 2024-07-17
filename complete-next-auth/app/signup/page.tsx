"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast ,{ Toaster }from "react-hot-toast";
const page = () => {
  const notify = () => toast("Signup success");
  const router = useRouter();
  const [user, setUser] = useState({
    username: "shravan",
    email: "kumashravan1@gmail.com",
    password: "Cbdadmin@123",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0
    ) {
      setButtonDisabled(true);
    }
  }, [user]);
  const onSignup = async () => {
    try {

      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        user
      );
      notify();
      console.log("send")
      console.log("signup succes", response.data);
      setTimeout(()=>{

        router.push("/login");
      },1300)

    } catch (error) {
      console.log("signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 rounded-lg text-white my-4 bg-slate-400"
        placeholder="username"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        type="text"
      />
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 rounded-lg text-white my-4 bg-slate-400"
        placeholder="email"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        type="text"
      />
      <hr />
      {/* {JSON.stringify(user)} */}
      <label htmlFor="password">password</label>
      <input
        className="p-2 rounded-lg text-white my-4 bg-slate-400"
        placeholder="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        type="text"
      />
      <hr />
      <button
        className="p-2 border border-gray-300
        rounded-lg mb-4 focus:outline-none focus:border-gray-200"
        onClick={onSignup}
      >
        {!buttonDisabled ? "No signup" : "Signup"}
      </button>
      <Toaster />
    </div>
  );
};

export default page;
