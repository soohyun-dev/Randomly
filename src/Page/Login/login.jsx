import styled from "styled-components";
import Footer from "../../Components/Footer";
import Nav from "../../Components/Nav";
import { userSlice, selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import LoginBox from "../../Components/Login/LoginBox";
import { auth } from "../../firebase";

export default function LoginPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log("유저", user);
  function LoginsignOut() {
    auth.signOut();
    dispatch(userSlice.actions.logout(user));
  }

  return (
    <>
      <Nav />
      {user ? (
        <div>
          <p>로그인 성공</p>
          <button onClick={LoginsignOut}>로그아웃</button>
        </div>
      ) : (
        <LoginSection>
          <TitleSection>
            {" "}
            <LoginTitle>LOGIN</LoginTitle>
          </TitleSection>

          <LoginBox />
        </LoginSection>
      )}
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
