import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { userSlice } from "../../features/userSlice";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";

export default function LoginBox() {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  /**
   * Google 로그인 설정
   */
  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        setUserData(data.user);
        dispatch(
          userSlice.actions.login({
            user: data.user.displayName,
            email: data.user.email,
          })
        );
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
      <LoginContainer>
        <LoginDiv>
          <button onClick={handleGoogleLogin}>Google Login</button>
          <button onClick={LoginsignOut}>로그아웃</button>
        </LoginDiv>
      </LoginContainer>
    </>
  );
}

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
