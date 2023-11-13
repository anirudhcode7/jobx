import FormAction from './components/FormAction'
import { useAuth } from './context/AuthContext';
import axios from 'axios';

const Home = () => {
  const { authToken } = useAuth();

  const getQuestions = async () => {
    try {
      console.log("Token: ",authToken);
      const response = await axios.get('http://localhost:3004/api/interview/questions', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Handle the response data
      console.log('Questions:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error fetching questions:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getQuestions();
    console.log('Interview Started');
  };

  return (
    <div>
      <h1>Welcome to JobX</h1>
      <FormAction handleSubmit={handleSubmit} text="Practice Interview" />
    </div>
  );
};

export default Home;
