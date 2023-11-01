import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold the error message

  const handleLogin = async () => {
    try {
      const data = {
        username,
        password,
      };

      const response = await axios.post('http://localhost:3004/api/auth/login', data);

      if (response.status === 200) {
        console.log('Login successful');
        // Optionally, you can handle successful login here.
        setError('Login successful');
      } else {
        console.log('Login failed');
        if (response.status === 404) {
          setError('User not found. Please check your username.');
        } else if (response.status === 401) {
          setError('Invalid password. Please check your password.');
        } else {
          setError('Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Network or server error. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
