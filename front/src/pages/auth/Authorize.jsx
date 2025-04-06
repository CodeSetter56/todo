import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

export default function Authorize() {
  const { user } = useAuth();
  const [login, setLogin] = useState(true);
  const navigate = useNavigate()

  return (
    <div className="flex h-full">
      <div className="w-1/2">
        <div className="text-7xl font-bold m-7 text-orange-600">
          <div>Welcome,</div>
          <div>{user ? user.username : "User"}</div>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <div className="bg-orange-600 w-5/6 h-5/6 p-5 rounded-4xl flex justify-center items-center">
          <div className="bg-orange-200 w-5/6 h-5/6 p-5 rounded-4xl flex flex-col justify-center items-stretch">

            {!user ? (
              login ? (
                <>
                  <Login />
                  <p className="mt-3 text-xl text-orange-700 flex items-center">
                    New user?{" "}
                    <button
                      className="btn font-bold bg-transparent px-1 text-orange-700 border-none shadow-none text-xl"
                      onClick={() => setLogin(false)}
                    >
                      Register
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <Register />
                  <p className="mt-3 text-xl text-orange-700 flex items-center">
                    Already have an account?
                    <button
                      className="btn font-bold bg-transparent px-1 text-orange-700 border-none shadow-none text-xl"
                      onClick={() => setLogin(true)}
                    >
                      Login
                    </button>
                  </p>
                </>
              )
            ) : (
              <div className="text-2xl font-semibold text-orange-800 text-center">
                <div>Todos pending:</div>
                <div>high:</div>
                <div>normal pending:</div>
                  <button className="btn m-1" onClick={() => navigate("/todos")}>View Todos</button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
