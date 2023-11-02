import Header from "../components/Header"
import Signup from "../components/auth/Signup"

export default function SignupPage(){
    return(
        <>
             <Header
                heading="Sign Up Your Account"
                />
            <Signup/>
        </>
    )
}