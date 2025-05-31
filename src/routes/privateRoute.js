import { Navigate } from "react-router-dom";
import { useAuthState } from "../ProviderContext/AppAuthJWTContext.js";
import AppLoader from "../components/AppLoader/index.js";

const PrivateRoute = ({ children }) => {
    const { auth } = useAuthState();
    if(auth?.isLoading) return <AppLoader/>
    
    if (!auth?.token) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };
export default PrivateRoute