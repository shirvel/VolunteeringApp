import React, { ReactNode } from 'react';
import { Route, Navigate, Outlet, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
    isAuthenticated: boolean;
    children?: ReactNode;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated }) => {
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return <Outlet />;
};
export default PrivateRoute;