import axios from "axios";

const API_URL = "http://localhost:3004/api/auth";
// const API_URL = 'https://jobx-32a058281844.herokuapp.com/api/auth';

export const authenticateUser = async (
  loginState,
  showNotification,
  setToken,
  onSuccess
) => {
  console.log("Login State: ", loginState);
  try {
    const data = loginState;
    console.log("data:", data);
    const response = await axios.post(`${API_URL}/login`, data);

    if (response.status === 200) {
      setToken(response.data.token);
      console.log("Login successful");
      // Optionally, you can handle successful login here.
      showNotification("Login successful", "success");
      onSuccess();
    }
  } catch (error) {
    console.log("Login failed");
    if (error.response.status === 404) {
      showNotification("User not found. Please check your username.", "error");
    } else if (error.response.status === 401) {
      showNotification(
        "Invalid password. Please check your password.",
        "error"
      );
    } else {
      showNotification(
        "Network or server error. Please try again later.",
        "error"
      );
    }
  }
  return;
};

export const saveUserToDB = async (
  signUpState,
  showNotification,
  onSuccess
) => {
  try {
    var data = {
      username: signUpState["username"],
      password: signUpState["password"],
      email: signUpState["email"],
    };
    console.log("data", data);
    const response = await axios.post(`${API_URL}/register`, data);
    console.log("Status:", response.status);
    console.log("Response:", response.data);

    if (response.status === 201) {
      console.log("Registration successful");
      showNotification("Registration successful", "success");
      onSuccess();
    }
  } catch (error) {
    console.log("Registration failed", error);
    if (error.response.status === 400) {
      console.log("Username is already in use.");
      showNotification("Username is already in use.", "error");
    } else if (error.response.status === 500) {
      console.error("Error during registration:", error);
      showNotification(
        "Network or server error. Please try again later.",
        "error"
      );
    } else {
      console.log("Failed");
      showNotification("Registration failed. Please try again.", "error");
    }
  }
};

export const saveRecruiterToDB = async (
  signUpState,
  showNotification,
  onSuccess
) => {
  try {
    var data = {
      username: signUpState["username"],
      password: signUpState["password"],
      email: signUpState["email"],
      company: signUpState["company"],
    };
    console.log("data", data);
    const response = await axios.post(`${API_URL}/recruiter/register`, data);
    console.log("Status:", response.status);
    console.log("Response:", response.data);

    if (response.status === 201) {
      console.log("Registration successful");
      showNotification("Registration successful", "success");
      onSuccess();
    }
  } catch (error) {
    console.log("Registration failed", error);
    if (error.response.status === 400) {
      console.log("Username is already in use.");
      showNotification("Username is already in use.", "error");
    } else if (error.response.status === 500) {
      console.error("Error during registration:", error);
      showNotification(
        "Network or server error. Please try again later.",
        "error"
      );
    } else {
      console.log("Failed");
      showNotification("Registration failed. Please try again.", "error");
    }
  }
};
