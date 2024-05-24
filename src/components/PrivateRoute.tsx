import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";


const PrivateRoute = () => {
    const {access_token} = useAppSelector((state) => state.auth);
    return (access_token) ? <Outlet /> : <Navigate to="/login" replace/>
}

export default PrivateRoute