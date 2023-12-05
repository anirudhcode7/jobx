import { useState } from 'react';
import { loginFields } from "../../constants/formFields";
import FormAction from "../FormAction";
import FormExtra from "../FormExtra";
import Input from "../Input";
import NotificationBanner from "../NotificationBanner";
import useNotification from '../../services/useNotification';
import {authenticateUser} from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const { setToken } = useAuth();
    const [loginState,setLoginState]=useState(fieldsState);
    const navigate = useNavigate();

    const { notification, showNotification, closeNotification } = useNotification();

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleClick=(e)=>{
        e.preventDefault();
        authenticateUser(loginState, showNotification, setToken, ()=>navigate('thank-you'));
    }

    return(
    <div>
        {notification && (
           <NotificationBanner
             message={notification.message}
             type={notification.type}
             onClose={closeNotification}
           />
        )}

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
        <br></br>
        <FormExtra/>
        <FormAction handleClick={handleClick} text="Login"/>

    </div>
    )
}
