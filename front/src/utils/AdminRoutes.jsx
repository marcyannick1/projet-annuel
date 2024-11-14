import { Outlet, Navigate } from "react-router-dom";
import {useContext} from "react";
import authContext from "../context/authContext.jsx";

const PrivateRoutes = () => {
    const { isSuperAdmin } = useContext(authContext);

    return isSuperAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;