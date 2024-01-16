import React, { useState } from 'react';
import { signupFields } from "../../constants/formFields";
import FormAction from "../FormAction";
import Input from "../Input";
import NotificationBanner from "../NotificationBanner"; 
import useNotification from '../../services/useNotification';
import { useNavigate } from 'react-router-dom';
import {saveUserToDB} from '../../api/authApi';
import InputField from '../Input';

const fields = signupFields;
let fieldsState = {};
fields.forEach(field => (fieldsState[field.id] = ''));

export default function Signup() {
  const [signUpState, setSignUpState] = useState(fieldsState);
  const navigate = useNavigate();

  const { notification, showNotification, closeNotification } = useNotification();

  const handleChange = (e) => {
    setSignUpState({ ...signUpState, [e.target.id]: e.target.value });
  }

  const handleClick = async (e) => {
    e.preventDefault();
    saveUserToDB(signUpState, showNotification, ()=>navigate('/'));
  }

  return (
    <div>
      {notification && (
        <NotificationBanner
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

    <div className="flex flex-col items-center justify-center " style={{height: '85vh'}}>
    <div className="bg-white p-8 rounded shadow-xl border-1 border-slate-100 w-96 mx-2">
        <h1 className="text-2xl font-bold mb-4 text-gray-600 text-center">Sign Up</h1>
        <div className="mb-4">
                {
                fields.map(field=>
                        <InputField
                            key={field.id}
                            handleChange={handleChange}
                            value={signUpState[field.id]}
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

        <FormAction handleClick={handleClick} text="Sign Up" />
        <p className="mt-4 text-sm text-gray-600 text-center">
        Already a user? <a href="/login" className="text-blue-700 font-semibold">Sign In</a>
        </p>
    </div>
    </div>

    </div>

  )
}
