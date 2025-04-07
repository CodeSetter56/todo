import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { register } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg("");
    register.mutate(
      { username, email, password },
      {
        onError: (error) => {
          const msg = error?.response?.data?.error || "Failed to register";
          setErrorMsg(msg);
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="m-2 text-3xl text-orange-700">Register to start</h2>
      <form
        onSubmit={handleRegister}
        className="bg-orange-200 w-5/6 p-5 rounded-box border border-orange-700 flex flex-col items-center"
      >
        <div className="flex flex-col justify-end w-full">
          <label className="text-black">Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            required
          />
        </div>

        <div className="flex flex-col justify-end w-full mt-3">
          <label className="text-black">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
        </div>

        <div className="flex flex-col justify-end w-full mt-3">
          <label className="text-black">Password</label>
          <div className="flex gap-3 mt-1 items-center">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input flex-1"
              required
            />
            <button
              type="submit"
              className="btn bg-orange-600 h-full"
              disabled={register.isPending}
            >
              Register
            </button>
          </div>
        </div>

        {errorMsg && (
          <p className="text-red-600 mt-3 text-sm text-center">{errorMsg}</p>
        )}
      </form>
    </div>
  );
}
