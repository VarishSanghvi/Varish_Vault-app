import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        setIsLoading(true); // Set loading to true
        try {
            const res = await axios.post('http://localhost:8080/api/auth/register', {
                username,
                password,
                email
            });
            setIsLoading(false); // Set loading to false
            alert('Registration successful!'); // Show success alert
            navigate('/login'); // Redirect to login page
        } catch (err) {
            setIsLoading(false); // Set loading to false on error
            // Using alert to show error messages
            alert(err.response.data || 'An error occurred during registration.'); 
            setError(err.response.data || 'An error occurred during registration.');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}

export default Register;




// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Register() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleRegister = async (event) => {
//         event.preventDefault();
//         setIsLoading(true);
//         try {
//             const res = await axios.post('http://localhost:8080/api/users/register', { // Update URL to user management service
//                 username,
//                 password,
//                 email
//             });
//             setIsLoading(false);
//             alert('Registration successful!');
//             navigate('/login'); // Redirect to login page
//         } catch (err) {
//             setIsLoading(false);
//             alert(err.response.data || 'An error occurred during registration.');
//             setError(err.response.data || 'An error occurred during registration.');
//         }
//     };

//     return (
//         <div>
//             <h2>Register</h2>
//             <form onSubmit={handleRegister}>
//                 <div>
//                     <label>Username:</label>
//                     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
//                 </div>
//                 <div>
//                     <label>Email:</label>
//                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 </div>
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//                 <button type="submit" disabled={isLoading}>
//                     {isLoading ? 'Registering...' : 'Register'}
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default Register;
