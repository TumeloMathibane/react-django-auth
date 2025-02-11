import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials!');
    }
  };

  useEffect(() => {
    if (user) navigate('/dashboard');
  });

  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <h2>Login</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
