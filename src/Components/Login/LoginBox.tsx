import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { userSlice } from "../../Features/userSlice";
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
          <LoginBtn onClick={handleGoogleLogin}>
            <GoogleImg src="https://user-images.githubusercontent.com/81623931/218374119-9690e410-d19f-4e34-b811-48457aa2b7a2.png" />
            구글 아이디로 로그인하기
          </LoginBtn>
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
  border-radius: 10px;
`;

const LoginDiv = styled.div`
  margin: 5em 0;
`;

const LoginBtn = styled.button`
  width: 17em;
  height: 3.2em;
  line-height: 3em;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    opacity: 70%;
  }
`;

const GoogleImg = styled.img`
  width: 1.7em;
  vertical-align: middle;
  margin-right: 1em;
`;
