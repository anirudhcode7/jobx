import React from 'react';
import LoginPage, {
  Email,
  Password,
  InnerBox,
  TitleSignup,
  TitleLogin,
  Submit,
  Title,
  Logo,
} from '@react-login-page/page10';
import LoginLogo from 'react-login-page/logo';
import LoginImg from '@react-login-page/page10/bg.png';
import LoginInnerBgImg from '@react-login-page/page10/inner-bg.jpg';

const Demo = () => (
  <LoginPage
    style={{ height: 690, backgroundImage: `url(${LoginImg})`, '--login-inner-image': `url("${LoginInnerBgImg}")` }}
  >
    <InnerBox style={{ backgroundImage: `url(${LoginInnerBgImg})` }} />
    <InnerBox panel="signup" style={{ backgroundImage: `url(${LoginInnerBgImg})` }} />
    <Title />
    <TitleSignup>Sign Up</TitleSignup>
    <TitleLogin>Login</TitleLogin>
    <Logo>
      <LoginLogo />
    </Logo>
    <Email placeholder="Your Email" name="userUserName" />
    <Password placeholder="Your Password" name="userPassword" />
    <Submit keyname="submit">Submit</Submit>
    <Submit keyname="reset">Reset</Submit>

    <Email panel="signup" placeholder="E-mail" keyname="e-mail" />
    <Password panel="signup" placeholder="Password" keyname="password" />
    <Submit panel="signup" keyname="signup-submit">
      Sign Up
    </Submit>
    <Submit panel="signup" keyname="signup-reset">
      Reset
    </Submit>
  </LoginPage>
);

export default Demo;