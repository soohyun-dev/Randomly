import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import Footer from "../../Components/Footer";
import Nav from "../../Components/Nav";
import { auth } from "../../firebase";

export default function LoginPage() {
  const [userData, setUserData] = useState(null);
  /**
   * Google 로그인 설정
   */

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        setUserData(data.user);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function LoginsignOut() {
    auth.signOut();
  }
  return (
    <>
      <Nav />
      <LoginSection>
        <TitleSection>
          {" "}
          <LoginTitle>LOGIN</LoginTitle>
        </TitleSection>

        <LoginContainer>
          <LoginDiv>
            <button onClick={handleGoogleLogin}>Google Login</button>
            <button onClick={LoginsignOut}>로그아웃</button>
          </LoginDiv>
        </LoginContainer>
      </LoginSection>
      <Footer />
    </>
  );
}

const TitleSection = styled.section`
  margin-bottom: 3em;
  text-align: center;
`;

const LoginTitle = styled.h1`
  font-size: 48px;
  margin: 3em 0 0em 0;
`;

const LoginSection = styled.section`
  text-align: center;
`;

const LoginContainer = styled.div`
  display: inline-block;
  margin: 1em 0;
  width: 20em;
  height: 25em;
  border: 1px solid;
  border-radius: 10px;
`;

const LoginDiv = styled.div`
  margin: 5em 0;
`;
