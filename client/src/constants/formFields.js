const loginFields = [
    {
        labelText: "Username",
        labelFor: "username",
        id: "username",
        name: "username",
        type: "text",
        autoComplete: "username",
        isRequired: true,
        placeholder: "Username",
        error: true,
        errorMessage: "Username is required"
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Password",
        error: false,
        errorMessage: "Password is required"
    }
]

const signupFields = [
    {
        labelText: "Username",
        labelFor: "username",
        id: "username",
        name: "username",
        type: "text",
        autoComplete: "username",
        isRequired: true,
        placeholder: "Username",
        error: false,
        errorMessage: "Username is required"
    },
    {
        labelText: "Email address",
        labelFor: "email-address",
        id: "email-address",
        name: "email",
        type: "email",
        autoComplete: "email",
        isRequired: true,
        placeholder: "Email address",
        error: false,
        errorMessage: "Email is required"
    },
    {
        labelText: "Password",
        labelFor: "password",
        id: "password",
        name: "password",
        type: "password",
        autoComplete: "current-password",
        isRequired: true,
        placeholder: "Password",
        error: false,
        errorMessage: "Password is required"
    },
    {
        labelText: "Confirm Password",
        labelFor: "confirm_password",
        id: "confirm_password",
        name: "confirm_password",
        type: "password",
        autoComplete: "confirm_password",
        isRequired: true,
        placeholder: "Confirm Password",
        error: false,
        errorMessage: "Password is required"
    }
]

export { loginFields, signupFields }