import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    login.mutate({ username, password },{
      onError:(error)=>{
        const msg = error?.response?.data?.error||"login failed"
        setErrorMsg(msg)
      }
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-3 text-3xl text-orange-700">Login to view your todos</h2>
      <form onSubmit={handleLogin} className="bg-orange-200 w-5/6 p-5 rounded-box border border-orange-700 flex flex-col">
        <label className="text-black">Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input w-full" required />

        <label className="text-black mt-3">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input w-full" required />

        <button type="submit" className="btn bg-orange-600 mt-4 w-full md:w-1/3 " disabled={login.isPending}>Login</button>
        {errorMsg && (<p className="text-red-600 mt-3 text-sm text-center">{errorMsg}</p>)}
      </form>
      
    </div>
  );
}
