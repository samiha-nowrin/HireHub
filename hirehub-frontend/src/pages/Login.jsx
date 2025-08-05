import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login.css'; // Make sure path is correct

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Please fill in both fields.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);

        // Redirect based on role
        if (data.user.role === 'employer') {
          navigate('/job-post');
        } else {
          navigate('/job-search');
        }
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Server error: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to HireHub</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="your@email.com"
          required 
        />
        
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Your password"
          required 
        />

        <button type="submit">Login</button>
      </form>

      {message && <p style={{ color: 'red', marginTop: '12px' }}>{message}</p>}

      <p className="register-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
