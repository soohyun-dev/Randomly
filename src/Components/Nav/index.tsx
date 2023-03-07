import { selectTheme, themeSlice } from 'features/themeSlice'
import { persistor } from 'index'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectUser } from 'features/userSlice'
import { Logo, LogoText, Logout, Menu, MenuText, Option, ThemeDiv, TopHeader } from './styles'

export default function Nav() {
    const user = useSelector(selectUser)
    const darkMode = useSelector(selectTheme)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const purge = async () => {
        await persistor.purge()
        await alert('로그아웃 되었습니다.')
        await navigate('/')
        await window.location.reload()
    }

    /**
     * 🌛 다크모드
     */
    const ChangeDarkMode = () => {
        dispatch(
            themeSlice.actions.setTheme({
                theme: !darkMode,
            })
        )
    }

    return (
        <TopHeader>
            <Logo>
                <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                    {/* <LogoImg src="https://user-images.githubusercontent.com/81623931/216827383-470908e4-f188-4711-b716-4677076e67c2.png" /> */}
                    <LogoText>Randomly</LogoText>
                </Link>
            </Logo>
            <Menu>
                <div>
                    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                        <MenuText>HOME</MenuText>
                    </Link>
                </div>
                <div>
                    <Link to="/PlayInterview" style={{ textDecoration: 'none', color: 'black' }}>
                        <MenuText>INTERVIEW</MenuText>
                    </Link>
                </div>
                <div>
                    <Link to="/Manage" style={{ textDecoration: 'none', color: 'black' }}>
                        <MenuText>MANAGE</MenuText>
                    </Link>
                </div>
                <div>
                    <Link to="/QAPage" style={{ textDecoration: 'none', color: 'black' }}>
                        <MenuText>Q&A</MenuText>
                    </Link>
                </div>
                <div>
                    {user === null ? (
                        ''
                    ) : (
                        <Link to="/Mypage" style={{ textDecoration: 'none', color: 'black' }}>
                            <MenuText>MYPAGE</MenuText>
                        </Link>
                    )}
                </div>
            </Menu>
            <Option>
                {user === null ? (
                    <Link to="/LOGIN" style={{ textDecoration: 'none', color: 'black' }}>
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
                        alt="dark"
                    />
                ) : (
                    <img
                        src="https://user-images.githubusercontent.com/81623931/220242243-82ad3074-2919-46a2-8b86-2e234511564a.png"
                        width="40"
                        height="40"
                        alt="light"
                    />
                )}
            </ThemeDiv>
        </TopHeader>
    )
}
