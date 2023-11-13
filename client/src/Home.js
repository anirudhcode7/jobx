import FormAction from './components/FormAction'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        console.log('Interview Started');
        navigate('/interview');
    };

    return (
    <div>
      <h1>Welcome to JobX</h1>
      <FormAction handleClick={handleClick} text="Practice Interview" />
    </div>
    );
};

export default Home;
