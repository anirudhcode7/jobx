import axios from 'axios';

require("dotenv").config();
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3004';
const API_URL = `${BACKEND_URL}/api/interview`;

export const fetchQuestions = (authToken) => {
  return axios.get(`${API_URL}/questions`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const submitInterview = (authToken, interviewData) => {
  return axios.post(`${API_URL}/responses`, { interview: interviewData }, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const evaluateInterview = (authToken) => {
  return axios.get(`${API_URL}/evaluate`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};
