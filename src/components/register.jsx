import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (register(username, email, password)) {
      alert('User registered successfully!');
      navigate('/login');
    } else {
      alert('Username already exists!');
    }
  };

  return (
    <div>
        <h2>Register</h2>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
