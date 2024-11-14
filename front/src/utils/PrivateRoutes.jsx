import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import authContext from "../context/authContext.jsx";

const PrivateRoutes = () => {
    const { user, isLoading } = useContext(authContext);

    if (isLoading) {
        return <div>Chargement...</div>; // Afficher un écran de chargement
    }

    return user ? <Outlet /> : <Navigate to="/LoginJSX" />;
};

export default PrivateRoutes;
