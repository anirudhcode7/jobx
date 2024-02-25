import axios from 'axios';

const API_URL = 'https://jobx-32a058281844.herokuapp.com/api/interview';

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
