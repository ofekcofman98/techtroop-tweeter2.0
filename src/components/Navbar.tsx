import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/profile">Profile</NavLink>
        </nav>
    )
}