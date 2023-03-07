import { useSelector, useDispatch } from 'react-redux'
import { userSlice, selectUser } from 'features/userSlice'
import { persistor } from '../..'
import { LoginSection, LoginTitle, TitleSection, Welcome } from './styles'
import Nav from 'Components/Nav'
import LoginBox from 'Components/LoginBox'
import Footer from 'Components/Footer'

export default function Login(): JSX.Element {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const purge = async () => {
        window.location.reload()
        await persistor.purge()
        dispatch(userSlice.actions.logout())
    }

    return (
        <>
            <Nav />
            {user ? (
                <Welcome>
                    <div>
                        <p>{user}님 환영합니다!!</p>

                        <button type="button" onClick={async () => purge()}>
                            로그아웃
                        </button>
                    </div>
                </Welcome>
            ) : (
                <LoginSection>
                    <TitleSection>
                        <LoginTitle>LOGIN</LoginTitle>
                    </TitleSection>

                    <LoginBox />
                </LoginSection>
            )}
            <Footer />
        </>
    )
}
