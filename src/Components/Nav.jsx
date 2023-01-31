import { Link } from "react-router-dom";
import styled from "styled-components";

const TopHeader = styled.header`
  display: flex;
  padding: 25px;
  font-size: 28px;
  color: black;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  text-align: center;
  align-items: center;
  &:visited {
    text-decoration: none;
    color: black;
  }
`;

const Logo = styled.div`
  font-weight: bold;
  width: 30%;
`;

const Middle = styled.div`
  width: 50%;
`;

const Menu = styled.div`
  display: flex;
  width: 30%;
  font-size: 16px;
`;

const MenuText = styled.p`
  font-weight: 500;
  padding: 0 1.5em;
  &:hover {
    font-weight: bold;
    transition: 0.8s;
  }
`;

export default function Nav() {
  return (
    <>
      <TopHeader>
        <Logo>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Randomly
          </Link>
        </Logo>
        <Middle></Middle>
        <Menu>
          <div>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <MenuText>HOME</MenuText>
            </Link>
          </div>
          <div>
            <Link
              to="/PlayInterview"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuText>INTERVIEW</MenuText>
            </Link>
          </div>
          <div>
            <Link
              to="/Manage"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuText> MANAGE</MenuText>
            </Link>
          </div>
        </Menu>
      </TopHeader>
    </>
  );
}
