import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';

const LayoutWithSidebar = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <Outlet />
            </div>
        </div>
    );
};

export default LayoutWithSidebar;
