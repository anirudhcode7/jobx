import { useState } from 'react';
import { loginFields } from "../../constants/formFields";
import FormAction from "../FormAction";
import FormExtra from "../FormExtra";
import Input from "../Input";
import axios from 'axios';
import NotificationBanner from "../NotificationBanner";
import { useNavigate } from 'react-router-dom';


const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();


    const showNotification = (message, type) => {
      setNotification({ message, type });
    }

    const closeNotification = () => {
      setNotification(null);
    }

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

        //Handle Login API Integration here
    const authenticateUser = async () =>{
        console.log("Login State: ", loginState);
        try {
          const data = loginState;
          console.log("data:", data);
          const response = await axios.post('http://localhost:3004/api/auth/login', data);

          if (response.status === 200) {
            console.log('Login successful');
            // Optionally, you can handle successful login here.
            showNotification('Login successful', 'success');
            navigate('/home');
          }
        } catch (error) {
          console.log('Login failed');
          if (error.response.status === 404) {
            showNotification('User not found. Please check your username.', 'error');
          } else if (error.response.status === 401) {
            showNotification('Invalid password. Please check your password.', 'error');
          } else {
            showNotification('Network or server error. Please try again later.', 'error');
          }
        }
        return;
    };

    return(
        <div>
       {notification && (
           <NotificationBanner
             message={notification.message}
             type={notification.type}
             onClose={closeNotification}
           />
         )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />

                )
            }
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
      </div>
    )
}
