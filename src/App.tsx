import WriteNotice from 'Page/Notice/WriteNotice'
import NoticePosting from 'Page/Notice/NoticePosting'
import QAPage from 'Page/Q&A/QAPage'
import QAPosting from 'Page/Q&A/QAPosting'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTheme } from 'features/themeSlice'
import WriteQA from 'Page/Q&A/WriteQA'
import Login from 'Page/Login'
import Main from 'Page/Main'
import Manage from 'Page/Manage'
import Mypage from 'Page/MyPage'
import PlayInterview from 'Page/PlayInterview'
import GlobalStyle from './styles/GlobalStyle'

export default function App(): JSX.Element {
    const theme = useSelector(selectTheme)

    return (
        <>
            <GlobalStyle theme={theme} />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/PlayInterview" element={<PlayInterview />} />
                <Route path="/Manage" element={<Manage />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Mypage" element={<Mypage />} />
                <Route path="/QAPage" element={<QAPage />} />
                <Route path="/WriteNotice" element={<WriteNotice />} />
                <Route path="/WriteQA" element={<WriteQA />} />
                <Route path="/NoticePosting/:order" element={<NoticePosting />} />
                <Route path="/QAposting/:order" element={<QAPosting />} />
            </Routes>
        </>
    )
}
