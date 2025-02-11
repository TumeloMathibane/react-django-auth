import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <Link to={'/'}>Home</Link>
      <Link to={'data-view'}>View data</Link>
      {/* <h2>Welcome, {user.username}</h2> */}
      {user ? <h2>Welcome, {user.username}. </h2> : <h2>Welcome, user.</h2>}
      <Outlet />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
