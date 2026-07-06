import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {

    const linkStyle = ({ isActive }: { isActive: boolean }) => ({
        color: isActive ? '#ffffff' : '#8899a6',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: isActive ? '600' : '400',
        padding: '8px 16px',
        borderRadius: '20px',
        transition: 'all 0.2s ease',
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
    });

    return (
        <nav style={{
            display: 'flex',
            gap: '12px',
            padding: '16px 24px',
            backgroundColor: '#15202b',
            borderBottom: '1px solid #38444d',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        }}>
            <NavLink to="/" style={linkStyle}>Home</NavLink>
            <NavLink to="/profile" style={linkStyle}>Profile</NavLink>
        </nav>
    )
}