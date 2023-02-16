import { persistor } from "index";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { selectUser } from "../Features/userSlice";

export default function Nav() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const purge = async () => {
    await persistor.purge();
    await alert("로그아웃 되었습니다.");
    await navigate("/");
    await window.location.reload();
  };
  return (
    <>
      <TopHeader>
        <Logo>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <LogoImg src="https://user-images.githubusercontent.com/81623931/216827383-470908e4-f188-4711-b716-4677076e67c2.png" />
          </Link>
        </Logo>
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
              ""
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
        <Option>
          {user === null ? (
            <Link
              to="/LOGIN"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuText>Login</MenuText>
            </Link>
          ) : (
            <Logout onClick={async () => purge()}>Logout</Logout>
          )}
        </Option>
      </TopHeader>
    </>
  );
}

const LogoImg = styled.img`
  width: 5.3em;
  height: 1.5em;
`;

const TopHeader = styled.header`
  z-index: 1000;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
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
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
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

const Option = styled.div`
  font-size: 16px;
`;

const Logout = styled.button`
  background-color: #ef9a9a;
  padding: 0.5em 0.5em;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  &:hover {
    opacity: 70%;
  }
`;
