import useAuth from "../hooks/useAuth";
import {Navigate, Outlet} from "react-router-dom";

const RequireAuth = () => {
    const {token} = useAuth();

    return (
        token ? <Outlet /> : <Navigate to='/login' replace={true} />
    )
}

export default RequireAuth;