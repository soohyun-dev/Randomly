import { persistor } from 'index'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectUser } from 'features/userSlice'
import { useEffect, useState } from 'react'
import { DarkModeToggle } from 'icons/DarkModeToggle/DarkModeToggle'
import {
    LinkText,
    Logo,
    LogoText,
    Logout,
    Menu,
    MenuText,
    Option,
    TopHeader,
    UserLabel,
} from './Nav.styled'

export default function Nav(props) {
    const [scrollPosition, setScrollPosition] = useState(0)
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const { page, isModalOpen } = props

    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop)
    }

    const purge = async () => {
        await persistor.purge()
        await alert('로그아웃 되었습니다.')
        await navigate('/')
        await window.location.reload()
    }

    useEffect(() => {
        window.addEventListener('scroll', updateScroll)
    })

    return (
        <TopHeader
            scroll={page === 'Main' && scrollPosition < 50 ? 'origin' : 'change'}
            isModalOpen={isModalOpen}
        >
            <Logo>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <LogoText scroll={page === 'Main' && scrollPosition < 50 ? 'origin' : 'change'}>
                        Randomly
                    </LogoText>
                </Link>
            </Logo>
            <Menu>
                <div>
                    <LinkText
                        to="/"
                        scroll={page === 'Main' && scrollPosition < 50 ? 'origin' : 'change'}
                    >
                        <MenuText>HOME</MenuText>
                    </LinkText>
                </div>
                <div>
                    <LinkText
                        to="/PlayInterview"
                        scroll={page === 'Main' && scrollPosition < 50 ? 'origin' : 'change'}
                    >
                        <MenuText>INTERVIEW</MenuText>
                    </LinkText>
                </div>
                <div>
                    <LinkText
                        to="/Review"
                        scroll={page === 'Main' && scrollPosition < 50 ? 'origin' : 'change'}
                    >
                        <MenuText>REVIEW</MenuText>
                    </LinkText>
                </div>
                <div>
                    <LinkText
                        to="/Manage"
                        scroll={page === 'Main' && scrollPosition < 50 ? 'origin' : 'change'}
                    >
                        <MenuText>MANAGE</MenuText>
                    </LinkText>
                </div>
                <div>
                    <LinkText
                        to="/Plan"
                        scroll={page === 'Main' && scrollPosition < 50 ? 'origin' : 'change'}
                    >
                        <MenuText>PLAN</MenuText>
                    </LinkText>
                </div>
                <div>
                    <LinkText
                        to="/QAPage"
                        scroll={page === 'Main' && scrollPosition < 50 ? 'origin' : 'change'}
                    >
                        <MenuText>Q&A</MenuText>
                    </LinkText>
                </div>
                <div>
                    {user === null ? (
                        ''
                    ) : (
                        <LinkText
                            to="/Mypage"
                            scroll={page === 'Main' && scrollPosition < 50 ? 'origin' : 'change'}
                        >
                            <MenuText>MYPAGE</MenuText>
                        </LinkText>
                    )}
                </div>
            </Menu>
            <Option>
                {user === null ? (
                    <LinkText
                        to="/LOGIN"
                        scroll={page === 'Main' && scrollPosition < 50 ? 'origin' : 'change'}
                    >
                        <MenuText>로그인</MenuText>
                    </LinkText>
                ) : (
                    <div>
                        <UserLabel>{user} 님</UserLabel>
                        <label htmlFor="repo">|</label>
                        <Logout
                            scroll={page === 'Main' && scrollPosition < 50 ? 'origin' : 'change'}
                            onClick={purge}
                        >
                            로그아웃
                        </Logout>
                    </div>
                )}
            </Option>

            <DarkModeToggle />
        </TopHeader>
    )
}
