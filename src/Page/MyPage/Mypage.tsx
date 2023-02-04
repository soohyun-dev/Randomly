import { useSelector } from "react-redux";
import styled from "styled-components";
import { persistor } from "../..";
import Footer from "../../Components/Footer";
import Nav from "../../Components/Nav";
import { selectUser, selectUserEmail } from "../../features/userSlice";

export default function Mypage() {
  const user = useSelector(selectUser);
  const email = useSelector(selectUserEmail);

  const purge = async () => {
    window.location.reload();
    await persistor.purge();
  };

  return (
    <>
      <Nav />
      <MypageSection>
        <div>
          <h1>{user} 님의 페이지</h1>
        </div>
        <div>
          <UserInfoDiv>
            <p>유저 이름: {user}</p>
            <p>이메일: {email}</p>
          </UserInfoDiv>
        </div>
        <button onClick={async () => purge()}>로그아웃</button>
      </MypageSection>
      <Footer />
    </>
  );
}

const MypageSection = styled.section`
  text-align: center;
  margin: 7em 0;
`;

const UserInfoDiv = styled.div`
  margin: 5em 0;
`;
