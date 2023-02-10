import styled from "styled-components";
import Nav from "../../Components/Nav";
import ManageQuestion from "../../Components/ManageInterview/ManageQuestion";
import ManageUser from "../../Components/ManageInterview/MangageUser";
import { useEffect, useState } from "react";
import Footer from "../../Components/Footer";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

export default function Manage() {
  const MiniTitle = styled.label<{ target?: any }>`
    padding: 0 0.5em;
    font-size: 24px;
    cursor: pointer;
    color: ${(props) => (props.target === page ? "black" : "#e0e0e0")};
    text-decoration: ${(props) => (props.target === page ? "underline" : "")};
    text-underline-position: under;
    &:hover {
      opacity: 80%;
    }
  `;
  const [page, setPage] = useState<string>("question");

  const changeView = (value) => {
    setPage(value);
  };

  const user = useSelector(selectUser);

  useEffect(() => {});

  return (
    <>
      <Nav />
      <TitleSection>
        <Title>MANAGE</Title>
      </TitleSection>
      <section style={{ textAlign: "center" }}>
        <div style={{ textAlign: "center", display: "inline" }}>
          <MiniTitle
            target={"question"}
            onClick={() => {
              changeView("question");
            }}
          >
            질문 관리
          </MiniTitle>
          <MiniTitle>|</MiniTitle>
          <MiniTitle
            target={"user"}
            onClick={() => {
              changeView("user");
            }}
          >
            참여자 관리
          </MiniTitle>
        </div>
      </section>
      {user !== null ? (
        ""
      ) : (
        <PasswordSection>
          <PasswordTitle>로그인 해주세요😋</PasswordTitle>
        </PasswordSection>
      )}
      {page === "question"
        ? user !== null && <ManageQuestion />
        : user !== null && <ManageUser />}
      <Footer />
    </>
  );
}

const TitleSection = styled.section`
  margin-bottom: 3em;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  margin: 3em 0 2em 0;
`;

const PasswordSection = styled.section`
  text-align: center;
  margin: 5em 0;
`;

const PasswordTitle = styled.label`
  margin: 0 1em;
`;

const PasswordInput = styled.input`
  width: 13em;
  height: 2em;
  border-radius: 5px;
  border: 0.5px solid;
  padding-left: 10px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
`;

const PasswordBtn = styled.button`
  width: 5em;
  height: 2.5em;
  border: none;
  border-radius: 10px;
  margin: 0 1em;
  cursor: pointer;
  &:hover {
    opacity: 70%;
  }
  font-family: "Spoqa Han Sans Neo", "sans-serif";
`;
