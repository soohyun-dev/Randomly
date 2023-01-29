import { Link } from "react-router-dom";
import styled from "styled-components";

const TopHeader = styled.header`
  display: flex;
  padding: 25px;
  font-weight: bold;
  font-size: 28px;
  color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
`;

const Logo = styled.div`
  width: 10%;
`;

const Middle = styled.div`
  width: 75%;
`;

const Menu = styled.div`
  width: 15%;
  font-size: 16px;
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
          <Link to="/ManageQuestion" style={{ textDecoration: "none" }}>
            질문 관리
          </Link>
        </Menu>
      </TopHeader>
    </>
  );
}
