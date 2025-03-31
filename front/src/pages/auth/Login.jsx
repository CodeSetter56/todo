import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function Login({ toggleForm }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: async (userData) => {
      const res = await axios.post("api/auth/login", userData, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      alert("Login successful!");
      console.log(data);
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Login failed");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-3 text-3xl text-orange-700">Login to view your todos</h2>
      <form onSubmit={handleLogin} className="bg-orange-200 w-5/6 p-5 rounded-box border border-orange-700 flex flex-col items-center">

        <div className="flex flex-col justify-end w-full">
        <label className="text-black">username</label>
        <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} className="input" required />
        </div>

        <div className="flex flex-col justify-end w-full">
        <label className="text-black mt-3">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required />
        </div>

        <button type="submit" className="btn btn-neutral mt-4 w-1/3">
          Login
        </button>
      </form>
      <div className="flex items-center">
        <p className="mt-3 text-xl text-orange-700">
          New user?{" "}
          <button className="btn font-bold bg-transparent p-0 m-0 text-orange-700 border-none shadow-none text-xl" onClick={toggleForm}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
