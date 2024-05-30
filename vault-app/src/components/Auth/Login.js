import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for redirection
import './Login.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password
      });

      const token = response.data.jwt; // Correctly access the jwt property from the response
      if (token) {
        localStorage.setItem('token', token);
        console.log('Login successful, token stored:', token);
        navigate('/'); // Navigate to upload page or other desired page after successful login
      } else {
        console.error('No token received');
        setError('Login failed, no token received.');
      }
    } catch (error) {
      console.error('Login error:', error.response || error.message);
      setError('Login failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError('');

//         try {
//             const response = await axios.post('http://localhost:8080/api/users/login', { // Update URL to user management service
//                 username,
//                 password
//             });

//             const token = response.data.token; // Access the token directly from the response
//             if (token) {
//                 localStorage.setItem('token', token);
//                 console.log('Login successful, token stored:', token);
//                 navigate('/'); // Navigate to upload page after successful login
//             } else {
//                 console.error('No token received');
//                 setError('Login failed, no token received.');
//             }
//         } catch (error) {
//             console.error('Login error:', error.response || error.message);
//             setError('Login failed: ' + (error.response?.data || error.message));
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <div>
//                     <label>Username:</label>
//                     <input 
//                         type="text" 
//                         value={username} 
//                         onChange={(e) => setUsername(e.target.value)} 
//                         required 
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input 
//                         type="password" 
//                         value={password} 
//                         onChange={(e) => setPassword(e.target.value)} 
//                         required 
//                     />
//                 </div>
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;
