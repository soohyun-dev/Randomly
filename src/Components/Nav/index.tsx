import { selectTheme, themeSlice } from 'features/themeSlice'
import { persistor } from 'index'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectUser } from 'features/userSlice'
import {
    LinkText,
    Logo,
    LogoText,
    Logout,
    Menu,
    MenuText,
    Option,
    ThemeDiv,
    TopHeader,
} from './styles'
import { useEffect, useState } from 'react'

export default function Nav() {
    const [scrollPosition, setScrollPosition] = useState(0)
    const user = useSelector(selectUser)
    const darkMode = useSelector(selectTheme)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop)
    }

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

    useEffect(() => {
        window.addEventListener('scroll', updateScroll)
    })

    return (
        <TopHeader scroll={scrollPosition < 50 ? 'origin' : 'change'}>
            <Logo>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <LogoText>Randomly</LogoText>
                </Link>
            </Logo>
            <Menu>
                <div>
                    <LinkText to="/" scroll={scrollPosition < 50 ? 'origin' : 'change'}>
                        <MenuText>HOME</MenuText>
                    </LinkText>
                </div>
                <div>
                    <LinkText
                        to="/PlayInterview"
                        scroll={scrollPosition < 50 ? 'origin' : 'change'}
                    >
                        <MenuText>INTERVIEW</MenuText>
                    </LinkText>
                </div>
                <div>
                    <LinkText to="/Manage" scroll={scrollPosition < 50 ? 'origin' : 'change'}>
                        <MenuText>MANAGE</MenuText>
                    </LinkText>
                </div>
                <div>
                    <LinkText to="/QAPage" scroll={scrollPosition < 50 ? 'origin' : 'change'}>
                        <MenuText>Q&A</MenuText>
                    </LinkText>
                </div>
                <div>
                    {user === null ? (
                        ''
                    ) : (
                        <LinkText to="/Mypage" scroll={scrollPosition < 50 ? 'origin' : 'change'}>
                            <MenuText>MYPAGE</MenuText>
                        </LinkText>
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
