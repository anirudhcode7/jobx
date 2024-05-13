import React, { useState, useEffect } from "react";
import { signupFields } from "../../constants/formFields";
import FormAction from "../FormAction";
import NotificationBanner from "../NotificationBanner";
import useNotification from "../../services/useNotification";
import { useNavigate } from "react-router-dom";
import { saveUserToDB } from "../../api/authApi";
import InputField from "../Input";

const fields = signupFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function RecruiterSignup() {
  const [signUpState, setSignUpState] = useState(fieldsState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { notification, showNotification, closeNotification } =
    useNotification();

  const handleChange = (e) => {
    setSignUpState({ ...signUpState, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (notification) {
      setIsSubmitting(false);
    }
  }, [notification]);
  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    var is_valid = true;

    // Create a new object to store the updated sign up state
    let updatedSignUpState = { ...signUpState };

    var password = "";
    // validating input fields
    for (const field of fields) {
      console.log("print fields", field.name);

      // removing existing error message
      field.error = false;
      // updatedSignUpState[field.id + "Error"] = false;

      //checking if value exists or not
      console.log("sign up state", signUpState[field.id]);
      if (!signUpState[field.id]) {
        field.error = true;
        field.errorMessage = `${field.labelText} is required`;
        //updatedSignUpState[field.id + "Error"] = true;
        //updatedSignUpState[field.id + "ErrorMessage"] = `${field.labelText} is required`;
        is_valid = false;
      } else {
        // validate if its a proper username
        if (
          field.name === "username" &&
          !/^[a-z0-9_]+$/.test(signUpState[field.id].trim())
        ) {
          field.error = true;
          field.errorMessage =
            "Username can only contain lowercase letters, numbers, and underscores";
          is_valid = false;
        } else if (
          field.name === "email" &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpState[field.id].trim())
        ) {
          field.error = true;
          field.errorMessage = "Invalid email format";
          is_valid = false;
        } else if (field.name === "password") {
          password = signUpState[field.id];
          if (signUpState[field.id].length < 8) {
            field.error = true;
            field.errorMessage = "Password must be at least 8 characters long";
            is_valid = false;
          } else if (
            /\s/.test(signUpState[field.id]) ||
            signUpState[field.id].includes(",")
          ) {
            field.error = true;
            field.errorMessage =
              "Password should not contain white spaces and commas";
            is_valid = false;
          }
        } else if (
          field.name === "confirm_password" &&
          signUpState[field.id] !== password
        ) {
          field.error = true;
          field.errorMessage = "Passwords do not match";
          is_valid = false;
        }
      }
      // Update the sign up state with the new error states
      setSignUpState(updatedSignUpState);
    }

    if (is_valid) {
      setIsSubmitting(true);
      saveUserToDB(signUpState, showNotification, () => navigate("/login"));
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

      <div
        className="flex flex-col items-center justify-center "
        style={{ height: "85vh" }}
      >
        <div className="bg-white p-5 lg:p-8 rounded shadow-xl border-1 border-slate-100 w-11/12 lg:w-96 mx-2">
          <h1 className="text-2xl font-bold mb-4 text-gray-600 text-center">
            Sign Up
          </h1>
          <div className="mb-4">
            {fields.map((field) => (
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
                error={field.error}
                errorMessage={field.errorMessage}
              />
            ))}
          </div>

          <FormAction
            handleClick={handleSubmitSignUp}
            text="Sign Up"
            loading={isSubmitting}
          />
          <p className="mt-4 text-sm text-gray-600 text-center">
            Already a user?{" "}
            <a href="/login" className="text-blue-700 font-semibold">
              Sign In
            </a>
          </p>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Not a Recruiter?{" "}
            <a href="/signup" className="text-blue-700 font-semibold">
              Candidate Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
