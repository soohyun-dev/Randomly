import WriteNotice from 'Page/Notice/WriteNotice/WriteNotice'
import NoticePosting from 'Page/Notice/NoticePosting/NoticePosting'
import QAPage from 'Page/Q&A/QAPage/QAPage'
import QAPosting from 'Page/Q&A/QAPosting/QAPosting'
import { Route, Routes } from 'react-router-dom'
import WriteQA from 'Page/Q&A/WriteQA/WriteQA'
import { useSelector } from 'react-redux'
import { selectTheme } from 'features/themeSlice'
import GlobalStyle from './styles/GlobalStyle'
import LoginPage from './Page/Login/login'
import Main from './Page/Main/Main'
import Manage from './Page/Manage/Manage'
import Mypage from './Page/MyPage/Mypage'
import PlayInterview from './Page/Play/PlayInterview'

export default function App(): JSX.Element {
    const theme = useSelector(selectTheme)

    return (
        <>
            <GlobalStyle theme={theme} />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/PlayInterview" element={<PlayInterview />} />
                <Route path="/Manage" element={<Manage />} />
                <Route path="/Login" element={<LoginPage />} />
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
