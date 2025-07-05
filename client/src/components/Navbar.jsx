import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <h1 style={styles.logo}>TaskMate</h1>
      </div>
      <div style={styles.right}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/register" style={styles.link}>Register</Link>
        <button onClick={handleLogout} style={styles.button}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#1e1e2f',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
  },
  left: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  logo: {
    color: '#d16ba5',
    margin: 0,
  },
  right: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.2s',
  },
  button: {
    background: '#d16ba5',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default Navbar;
