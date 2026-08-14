import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoutes(){
    const {loading, isAuthenticated} = useAuth();

    if(loading){
        return <div>loading...</div>
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }

    return <Outlet/>
}