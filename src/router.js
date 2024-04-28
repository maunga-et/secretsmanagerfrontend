import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<RequireAuth />}>
                <Route index={true} element={<Home />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Route>
    )
)