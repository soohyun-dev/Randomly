import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userSlice } from '../../Features/userSlice'
import { auth } from '../../firebase'
import { GoogleImg, LoginBtn, LoginContainer, LoginDiv } from './styles'

export default function LoginBox() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    /**
     * Google 로그인 설정
     */
    function handleGoogleLogin() {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((data) => {
                dispatch(
                    userSlice.actions.login({
                        user: data.user.displayName,
                        email: data.user.email,
                    })
                )
                navigate('/Mypage')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <LoginContainer>
            <LoginDiv>
                <LoginBtn onClick={handleGoogleLogin}>
                    <GoogleImg src="https://user-images.githubusercontent.com/81623931/218374119-9690e410-d19f-4e34-b811-48457aa2b7a2.png" />
                    구글 아이디로 로그인하기
                </LoginBtn>
            </LoginDiv>
        </LoginContainer>
    )
}
