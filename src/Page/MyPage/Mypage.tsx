import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { persistor } from "../..";
import Footer from "../../Components/Footer";
import Nav from "../../Components/Nav";
import { selectUser, selectUserEmail } from "../../features/userSlice";
import { useEffect } from "react";

export default function Mypage() {
  const user = useSelector(selectUser);
  const email = useSelector(selectUserEmail);
  const navigate = useNavigate();

  const purge = async () => {
    window.location.reload();
    await persistor.purge();
  };

  if (user === null && email === null) {
    navigate("/");
  }
  console.log(user, email);

  useEffect(() => {}, [user, email]);

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
