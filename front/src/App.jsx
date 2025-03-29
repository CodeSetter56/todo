import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Home from './pages/Hero/Home';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Profile from './pages/profile/Profile';
import Notifications from './pages/Hero/Notifications';
import Todo from './pages/hero/Todo';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPending, setIsPending] = useState(true); // Default: Pending mode

  return (
    <>
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} setIsPending={setIsPending} />

        {/* Main Content */}
        <div className="flex-1 p-4 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Home isPending={isPending} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifs" element={<Notifications />} />
            <Route path="/todos" element={<Todo />} />
          </Routes>
        </div>
      </div>
    </>
  );
}


export default App;