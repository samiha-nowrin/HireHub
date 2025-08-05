import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>HireHub</h1>
      <p>Connecting employers and job seekers</p>
      <div className="home-buttons">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>  {/* this will go to /register */}
      </div>
    </div>
  );
}

export default Home;
