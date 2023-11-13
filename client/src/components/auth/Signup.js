import React, { useState } from 'react';
import { signupFields } from "../../constants/formFields";
import FormAction from "../FormAction";
import Input from "../Input";
import NotificationBanner from "../NotificationBanner"; // Import the NotificationBanner component
import axios from 'axios';

const fields = signupFields;
let fieldsState = {};
fields.forEach(field => (fieldsState[field.id] = ''));

export default function Signup() {
  const [signUpState, setSignUpState] = useState(fieldsState);

  const handleChange = (e) => {
    setSignUpState({ ...signUpState, [e.target.id]: e.target.value });
  }

  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  }

  const closeNotification = () => {
    setNotification(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    saveUserToDB();
  }

  const saveUserToDB = async () => {
    try {
      var data = {
        username: signUpState["username"],
        password: signUpState["password"],
      }

      const response = await axios.post('http://localhost:3004/api/auth/register', data);
      console.log("Status:",response.status);
      console.log("Response:",response.data);

      if (response.status === 201) {
        console.log('Registration successful');
        showNotification('Registration successful', 'success');
      }
    } catch (error) {
      console.log('Registration failed');
      if (error.response.status === 400) {
        console.log("Username is already in use.")
        showNotification('Username is already in use.', 'error');
      }
      else if (error.response.status == 500) {
        console.error('Error during registration:', error);
        showNotification('Network or server error. Please try again later.', 'error');
      }
      else {
        console.log("Failed")
        showNotification('Registration failed. Please try again.', 'error');
      }
    }
  };

  return (
    <div>
      {notification && (
        <NotificationBanner
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {
            fields.map(field =>
              <Input
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

        <FormAction handleSubmit={handleSubmit} text="Sign Up" />
      </form>
    </div>
  )
}
