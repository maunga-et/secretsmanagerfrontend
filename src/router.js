import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SecretRecordsList from "./pages/SecretRecordsList";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<RequireAuth />}>
                <Route index={true} element={<Home />} />
                <Route path='/secrets/' element={<SecretRecordsList />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Route>
    )
)