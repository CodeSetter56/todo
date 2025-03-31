import { useState } from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";

export default function Home() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex h-full">
      {/* Left Section */}
      <div className="w-1/2">
        <div className="text-7xl font-bold m-7 text-orange-600">
          <div>Welcome,</div>
          <div>User</div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="bg-orange-600 w-5/6 h-5/6 p-5 rounded-4xl flex justify-center items-center">
          <div className="bg-orange-200 w-5/6 h-5/6 p-5 rounded-4xl flex flex-col justify-center items-stretch">
            {isRegister ? <Register toggleForm={() => setIsRegister(false)} /> : <Login toggleForm={() => setIsRegister(true)} />}
          </div>
        </div>
      </div>
    </div>
  );
}
