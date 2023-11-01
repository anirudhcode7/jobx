import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold the error message

  const handleRegister = async () => {
    try {
      const data = {
        username,
        password,
      };

      const response = await axios.post('http://localhost:3004/api/auth/register', data);

      if (response.status === 201) {
        console.log('Registration successful');
        setError('Registration successful');
      } else {
        console.log('Registration failed');
        if (response.status === 400) {
          setError('Username is already in use.');
        } else {
          setError('Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Network or server error. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
