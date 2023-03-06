import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { persistor } from '../..'
import Footer from '../../Components/Footer'
import Nav from '../../Components/Nav'
import { selectUser, selectUserEmail } from '../../features/userSlice'
import {
    InfoDiv,
    InfoLabel,
    Logout,
    MyPageBox,
    MypageSection,
    MyPageTitle,
    Title,
    UserInfoDiv,
} from './styles'

export default function Mypage() {
    const user = useSelector(selectUser)
    const email = useSelector(selectUserEmail)
    const navigate = useNavigate()

    const purge = async () => {
        await persistor.purge()
        await alert('로그아웃 되었습니다.')
        await navigate('/')
        await window.location.reload()
    }

    return (
        <>
            <Nav />
            <MypageSection>
                <MyPageBox>
                    <div>
                        <Title>
                            <MyPageTitle>{user} 님의 페이지</MyPageTitle>
                            <Logout onClick={async () => purge()}>로그아웃</Logout>
                        </Title>
                        <hr />
                    </div>

                    <UserInfoDiv>
                        <InfoDiv>
                            <div>
                                <InfoLabel>유저이름</InfoLabel>
                            </div>
                            <label>{user}</label>
                        </InfoDiv>
                        <InfoDiv>
                            <div>
                                <InfoLabel>이메일</InfoLabel>
                            </div>
                            <label>{email}</label>
                        </InfoDiv>
                    </UserInfoDiv>
                </MyPageBox>
            </MypageSection>
            <Footer />
        </>
    )
}
