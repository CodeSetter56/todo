import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function Register({ toggleForm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const res = await axios.post("/api/auth/signup", userData, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      alert("Registration successful!");
      console.log(data);
      toggleForm(); 
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Registration failed");
    },
  });

  const handleRegister = (e) => {
    e.preventDefault();
    registerMutation.mutate({ name, email, password });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="m-2 text-3xl text-orange-700">Register to start</h2>
      <form onSubmit={handleRegister} className="bg-orange-200 w-5/6 p-5 rounded-box border border-orange-700 flex flex-col items-center">
      
        <div className="flex flex-col justify-end w-full">
        <label className="text-black">Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" required />
        </div>

        <div className="flex flex-col justify-end w-full">
        <label className="text-black mt-3">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
        </div>

        <div className="flex flex-col justify-end w-full">
        <label className="text-black mt-3">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required />
        </div>

        <button type="submit" className="btn btn-neutral mt-4 w-2/6">
          Register
        </button>
      </form>
      <div className="flex items-center">
        <p className="m-2 text-xl text-orange-700">
          Already have an account?{" "}
          <button className="btn font-bold bg-transparent p-0 m-0 text-orange-700 border-none shadow-none text-xl" onClick={toggleForm}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
