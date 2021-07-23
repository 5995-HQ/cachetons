import React from 'react';
import { Link } from 'react-router-dom';
import './SideBarFancy.css';

export const SideBarFancy = () => (
    <div className="sidebar">
        <div className="text-2xl">
            <Link to="/">Home</Link>
            <Link to="/counter">Counter Button</Link>
            <Link to="/people-list">People List</Link>
            <Link to="/front-list">Front List</Link>
            <Link to="/user">User Profile</Link>
            <Link to="/forms">Forms</Link>
        </div>
    </div>
)
