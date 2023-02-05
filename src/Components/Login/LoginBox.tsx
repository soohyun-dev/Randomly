import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { userSlice } from "../../features/userSlice";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LoginBox() {
  const [userData, setUserData] = useState<Object | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        navigate("/Mypage");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <LoginContainer>
        <LoginDiv>
          <button onClick={handleGoogleLogin}>Google Login</button>
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
