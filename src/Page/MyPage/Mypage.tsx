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
    await persistor.purge();
    await alert("로그아웃 되었습니다.");
    await navigate("/");
    await window.location.reload();
  };

  return (
    <>
      <Nav />
      <MypageSection>
        <MyPageBox>
          <div>
            <Title>
              <MyPageTitle>{user} 님의 페이지</MyPageTitle>
              <Logout onClick={async () => purge()}>로그아웃</Logout>
            </Title>
            <hr />
          </div>

          <UserInfoDiv>
            <InfoDiv>
              <div>
                <InfoLabel>유저이름</InfoLabel>
              </div>
              <label>{user}</label>
            </InfoDiv>
            <InfoDiv>
              <div>
                <InfoLabel>이메일</InfoLabel>
              </div>
              <label>{email}</label>
            </InfoDiv>
          </UserInfoDiv>
        </MyPageBox>
      </MypageSection>
      <Footer />
    </>
  );
}

const MypageSection = styled.section`
  text-align: center;
  margin: 7em 0;
`;

const MyPageBox = styled.div`
  display: inline-block;
  text-align: left;
  width: 80%;
`;

const Title = styled.div`
  display: flex;
  margin: 0.5em 0;
`;

const MyPageTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-right: 2em;
`;

const Logout = styled.button`
  background-color: #ef9a9a;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  &:hover {
    opacity: 70%;
  }
`;

const UserInfoDiv = styled.div`
  margin: 5em 0;
`;

const InfoDiv = styled.div`
  margin: 1em 0;
`;

const InfoLabel = styled.label`
  font-weight: 600;
`;
