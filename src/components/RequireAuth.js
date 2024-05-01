import useAuth from "../hooks/useAuth";
import {Navigate, Outlet} from "react-router-dom";
import NavBar from "./NavBar";

const RequireAuth = () => {
    const {token} = useAuth();

    return (
        token ? (
            <>
                <NavBar />
                <Outlet />
            </>
        ) : <Navigate to='/login' replace={true} />
    )
}

export default RequireAuth;