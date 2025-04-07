import { createContext, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const fetchUser = async () => {
  const res = await axios.get("/api/user/getme", {
    withCredentials: true,
  });
  return res.data;
};

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {data: user,isLoading: loadingUser,refetch: refetchUser,} = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
    onError: (err) => {
      if (err.response?.status === 401) {
        queryClient.removeQueries({ queryKey: ["currentUser"] });
      }
    },
  });

  const login = useMutation({
    mutationFn: async (credentials) => {
      const res = await axios.post("/api/auth/login", credentials, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: async () => {
      await refetchUser(); 
    },
  });

  const register = useMutation({
    mutationFn: async (credentials) => {
      const res = await axios.post("/api/auth/signup", credentials, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: async () => {
      await refetchUser(); 
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["currentUser"] }); 
      navigate("/");
    },
  });

  const toggleDarkMode = useMutation({
    mutationFn: async (newTheme) => {
      await axios.post("/api/user/darkmode", { darkmode: newTheme }, { withCredentials: true });
    },
    onSuccess: async () => {
      await refetchUser();
    },
  });

  return (
    <AuthContext.Provider
      value={{user,loadingUser,login,register,logout,toggleDarkMode}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
