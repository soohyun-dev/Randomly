import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { selectUser } from "../features/userSlice";

export default function Nav() {
  const user = useSelector(selectUser);
  return (
    <>
      <TopHeader>
        <Logo>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <LogoImg src="https://user-images.githubusercontent.com/81623931/216827383-470908e4-f188-4711-b716-4677076e67c2.png" />
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
              <MenuText>MANAGE</MenuText>
            </Link>
          </div>
          <div>
            <Link
              to="/QAPage"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuText>Q&A</MenuText>
            </Link>
          </div>
          <div>
            {user === null ? (
              <Link
                to="/LOGIN"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuText>Login</MenuText>
              </Link>
            ) : (
              <Link
                to="/Mypage"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuText>MYPAGE</MenuText>
              </Link>
            )}
          </div>
        </Menu>
      </TopHeader>
    </>
  );
}

const LogoImg = styled.img`
  width: 5.3em;
  height: 1.5em;
`;

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
  width: 25%;
`;

const Middle = styled.div`
  width: 5%;
`;

const Menu = styled.div`
  display: flex;
  width: 70%;
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
