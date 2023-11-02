//import React, { useState } from 'react';
//import axios from 'axios';
//
//function Register() {
//  const [username, setUsername] = useState('');
//  const [password, setPassword] = useState('');
//  const [error, setError] = useState(''); // State to hold the error message
//
//  const handleRegister = async () => {
//    try {
//      const data = {
//        username,
//        password,
//      };
//
//      const response = await axios.post('http://localhost:3004/api/auth/register', data);
//
//      if (response.status === 201) {
//        console.log('Registration successful');
//        setError('Registration successful');
//      } else {
//        console.log('Registration failed');
//        if (response.status === 400) {
//          setError('Username is already in use.');
//        } else {
//          setError('Registration failed. Please try again.');
//        }
//      }
//    } catch (error) {
//      console.error('Error during registration:', error);
//      setError('Network or server error. Please try again later.');
//    }
//  };
//
//  return (
//    <div>
//      <h2>Sign Up</h2>
//      {error && <p style={{ color: 'red' }}>{error}</p>}
//      <form>
//        <div>
//          <label>Username:</label>
//          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//        </div>
//        <div>
//          <label>Password:</label>
//          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//        </div>
//        <button type="button" onClick={handleRegister}>
//          Register
//        </button>
//      </form>
//    </div>
//  );
//}
//
//export default Register;


import { useState } from 'react';
import { signupFields } from "../../constants/formFields";
import FormAction from "../FormAction";
import Input from "../Input";
import axios from 'axios';

const fields=signupFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Signup(){
    const [signUpState,setSignUpState]=useState(fieldsState);
    const [error, setError] = useState(null);

    const handleChange=(e)=>{
        setSignUpState({...signUpState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("Hello world!!!")
        saveUserToDB();
    }
    console.log("Sign up state: ", signUpState);

     const saveUserToDB = async () => {
        try {
          var data = {
            username: signUpState["username"],
            password: signUpState["password"],
          }

          console.log("data: ", data);

          const response = await axios.post('http://localhost:3004/api/auth/register', data);

          if (response.status === 201) {
            console.log('Registration successful');
            setError('Registration successful');
          } else {
            console.log('Registration failed');
            if (response.status === 400) {
              console.log("Username is already in use.")
              setError('Username is already in use.');
            } else {
              console.log("Failed")
              setError('Registration failed. Please try again.');
            }
          }
        } catch (error) {
          console.error('Error during registration:', error);
          setError('Network or server error. Please try again later.');
        }
      };

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
            {
                fields.map(field=>
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

        <FormAction handleSubmit={handleSubmit} text="Sign Up"/>

      </form>
    )
}
