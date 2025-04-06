import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className='flex flex-col w-full h-full items-center justify-center'>
      <div>Ez todos</div>
      {user && (
        <div className="flex flex-col items-center mt-4">
          <div>Welcome {user.username}</div>
          <button className="btn m-1" onClick={() => navigate("/todos")}>
            View Todos
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
