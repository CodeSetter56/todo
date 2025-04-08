import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import MobileSidebar from "./components/common/MobileSidebar";
import Home from "./pages/hero/Home";
import Profile from "./pages/profile/Profile";
import Notifications from "./pages/hero/Notifications";
import Todo from "./pages/hero/Todo";
import Authorize from "./pages/auth/Authorize";

function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [isPending, setIsPending] = useState(true);

  const { user, loadingUser } = useAuth();

  const hideRoutes = ["/", "/authorize"];
  const showSidebar = !hideRoutes.includes(location.pathname);

  useEffect(() => {
    setPageLoading(true);
    const timeout = setTimeout(() => setPageLoading(false), 300);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  if (loadingUser || pageLoading) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center h-screen px-4">
        <div className="skeleton h-8 w-3/4"></div>
        <div className="skeleton h-8 w-1/2"></div>
        <div className="skeleton h-8 w-2/3"></div>
        <div className="skeleton h-60 w-full max-w-md rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      {showSidebar && (
        <div className="md:hidden">
          <MobileSidebar isPending={isPending} setIsPending={setIsPending} />
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {showSidebar && (
          <div className="hidden md:flex">
            <Sidebar
              isOpen={sidebarOpen}
              setIsOpen={setSidebarOpen}
              isPending={isPending}
              setIsPending={setIsPending}
            />
          </div>
        )}

        <div className="flex-1 overflow-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/authorize" element={<Authorize />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/authorize" />} />
            <Route path="/notifs" element={user ? <Notifications /> : <Navigate to="/authorize" />} />
            <Route path="/todos" element={user ? <Todo isPending={isPending} /> : <Navigate to="/authorize" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
