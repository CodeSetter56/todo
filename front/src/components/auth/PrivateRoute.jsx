import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute({ children }) {
    const { user, isLoading, isError } = useAuth();

    if (isLoading) return <p>Loading...</p>; 
    if (!user || isError) return <Navigate to="/authorize" />;

    return children;
}
