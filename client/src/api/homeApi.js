import axios from 'axios';

const API_URL = 'http://localhost:3004/api/interview';
// const API_URL = 'https://jobx-32a058281844.herokuapp.com/api/interview';

export const fetchInterviewCounts = (authToken) => {
    return axios.get(`${API_URL}/count`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  };