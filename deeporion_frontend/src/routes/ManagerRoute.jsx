import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ManagerRoute = () => {
    const isManager = localStorage.getItem('role') !== 'employee'; // Assuming isManager flag is stored in localStorage

    return isManager ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default ManagerRoute;
