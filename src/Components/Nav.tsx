import { selectTheme, themeSlice } from "features/themeSlice";
import { persistor } from "index";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { selectUser } from "../features/userSlice";

export default function Nav() {
  const user = useSelector(selectUser);
  const darkMode = useSelector(selectTheme);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const purge = async () => {
    await persistor.purge();
    await alert("로그아웃 되었습니다.");
    await navigate("/");
    await window.location.reload();
  };

  /**
   * 🌛 다크모드
   */
  const ChangeDarkMode = () => {
    dispatch(
      themeSlice.actions.setTheme({
        theme: !darkMode,
      })
    );
  };

  console.log(darkMode);

  return (
    <>
      <TopHeader>
        <Logo>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            {/* <LogoImg src="https://user-images.githubusercontent.com/81623931/216827383-470908e4-f188-4711-b716-4677076e67c2.png" /> */}
            <LogoText>Randomly</LogoText>
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
        <ThemeDiv onClick={ChangeDarkMode}>
          {darkMode ? (
            <img
              src="https://user-images.githubusercontent.com/81623931/220241975-7eb1ba2c-fa5a-4baa-9d0f-72bd3f514183.png"
              width="40"
              height="40"
            />
          ) : (
            <img
              src="https://user-images.githubusercontent.com/81623931/220242243-82ad3074-2919-46a2-8b86-2e234511564a.png"
              width="40"
              height="40"
            />
          )}
        </ThemeDiv>
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
  grid-template-columns: 1fr 2.2fr 0.5fr 0.3fr;
  padding: 15px 15px 10px 15px;
  font-size: 28px;
  color: black;
  background-color: var(--navbar-box);
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

const LogoText = styled.p`
  color: var(--logo-text);
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

const ThemeDiv = styled.div`
  cursor: pointer;
`;
