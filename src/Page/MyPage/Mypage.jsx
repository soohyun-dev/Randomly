import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../../Components/Footer";
import Nav from "../../Components/Nav";
import { selectUser, selectUserEmail } from "../../features/userSlice";

export default function Mypage() {
  const user = useSelector(selectUser);
  const email = useSelector(selectUserEmail);
  return (
    <>
      <Nav />
      <MypageSection>
        <div>
          <h1>{user} 님의 페이지</h1>
        </div>
        <div>
          <p>유저 이름: {user}</p>
          <p>이메일: {email}</p>
        </div>
      </MypageSection>
      <Footer />
    </>
  );
}

const MypageSection = styled.section`
  text-align: center;
  margin: 10em 0;
`;
