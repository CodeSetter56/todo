import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Home from './pages/hero/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Profile from './pages/profile/Profile';
import Notifications from './pages/hero/Notifications';
import Todo from './pages/hero/Todo';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const location = useLocation();

  // Check if current path is login or Register to hide sidebar
  const hideRoutes = ['/','/login', '/register'];
  const shouldShowSidebar = !hideRoutes.includes(location.pathname);

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content below Navbar */}
      <div className="flex flex-1 overflow-hidden">
        {shouldShowSidebar && (
          <Sidebar
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
            setIsPending={setIsPending}
          />
        )}

        {/* Main page content area */}
        <div className="flex-1 p-4 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifs" element={<Notifications />} />
            <Route path="/todos" element={<Todo isPending={isPending} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
