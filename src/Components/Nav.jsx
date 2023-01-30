import { Link } from "react-router-dom";
import styled from "styled-components";

const TopHeader = styled.header`
  display: flex;
  padding: 25px;
  font-weight: bold;
  font-size: 28px;
  color: black;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
`;

const Logo = styled.div`
  width: 10%;
`;

const Middle = styled.div`
  width: 75%;
`;

const Menu = styled.div`
  display: flex;
  width: 15%;
  font-size: 16px;
`;

const MenuText = styled.p`
  padding: 0 1em;
`;

export default function Nav() {
  return (
    <>
      <TopHeader>
        <Logo>
          <Link to="/" style={{ textDecoration: "none" }}>
            Randomly
          </Link>
        </Logo>
        <Middle></Middle>
        <Menu>
          <Link to="/PlayInterview" style={{ textDecoration: "none" }}>
            <MenuText>인터뷰 하기</MenuText>
          </Link>
          <Link to="/ManageQuestion" style={{ textDecoration: "none" }}>
            <MenuText>관리</MenuText>
          </Link>
        </Menu>
      </TopHeader>
    </>
  );
}
