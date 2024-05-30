// src/components/Home/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Vault App</h1>
      <p>Securely upload and manage your files</p>
      <div className="home-buttons">
        <Link to="/upload" className="home-button">Upload Files</Link>
        <Link to="/files" className="home-button">View Files</Link>
      </div>
    </div>
  );
};

export default Home;
