import React, { useState, useEffect } from 'react';
import FormAction from './components/FormAction';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Import your AuthContext


const MAX_ATTEMPTS = process.env.REACT_APP_MAX_ATTEMPTS || 5;

const Home = () => {
    const navigate = useNavigate();
    const { authToken } = useAuth(); // Get the authToken from your AuthContext
    const [remainingAttempts, setRemainingAttempts] = useState(MAX_ATTEMPTS);

    useEffect(() => {
        // Fetch the current count of interviews for the user
        axios.get('http://localhost:3004/api/interview/count', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(response => {
            // Assuming the response contains the count of interviews
            const interviewCount = response.data.count;
            setRemainingAttempts(MAX_ATTEMPTS - interviewCount);
        })
        .catch(error => {
            console.error('Error fetching interview count:', error);
        });
    }, [authToken]);

    const handleClick = (e) => {
        e.preventDefault();

        // Check if the user has remaining attempts
        if (remainingAttempts <= 0) {
            alert("You have reached the maximum number of interview attempts.");
            return;
        }

        console.log('Interview Started');
        navigate('/interview');
    };

    return (
        <div>
            <h1>Welcome to JobX</h1>
            <p>You have {remainingAttempts} interview attempts remaining.</p>
            <FormAction handleClick={handleClick} text="Practice Interview" />
        </div>
    );
};

export default Home;
