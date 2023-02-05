import styled from "styled-components";
import Footer from "../../Components/Footer";
import Nav from "../../Components/Nav";
import {
  userSlice,
  selectUser,
  selectUserEmail,
} from "../../features/userSlice";
import { useSelector } from "react-redux";
import LoginBox from "../../Components/Login/LoginBox";
import { persistor } from "../..";
import { useDispatch } from "react-redux";

export default function LoginPage(): JSX.Element {
  const user = useSelector(selectUser);
  const email = useSelector(selectUserEmail);
  const dispatch = useDispatch();

  const purge = async () => {
    window.location.reload();
    await persistor.purge();
    dispatch(userSlice.actions.logout());
  };

  return (
    <>
      <Nav />
      {user ? (
        <Welcome>
          <div>
            <p>{user}님 환영합니다!!</p>

            <button onClick={async () => purge()}>로그아웃</button>
          </div>
        </Welcome>
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

const Welcome = styled.section`
  text-align: center;
  margin: 10em 0;
`;
