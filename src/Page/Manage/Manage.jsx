import styled from "styled-components";
import Nav from "../../Components/Nav";
import ManageQuestion from "../../Components/ManageInterview/ManageQuestion";
import ManageUser from "../../Components/ManageInterview/MangageUser";
import { useState } from "react";
import Footer from "../../Components/Footer";

export default function Manage() {
  const MiniTitle = styled.label`
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

  const [page, setPage] = useState("question");

  const changeView = (value) => {
    setPage(value);
  };

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
            유저 관리
          </MiniTitle>
        </div>
      </section>

      {page === "question" ? <ManageQuestion /> : <ManageUser />}
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
