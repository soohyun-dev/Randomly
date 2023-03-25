import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import GlobalStyle from 'styles/GlobalStyle'
import Plan from 'Page/Plan'
import { useEffect } from 'react'
import ScrollToTop from './utils/ScrollToTop'
import Mypage from './Page/MyPage'
import WriteNotice from './Page/Notice/WriteNotice'
import QAPage from './Page/Q&A/QAPage'
import NoticePosting from './Page/Notice/NoticePosting'
import QAPosting from './Page/Q&A/QAPosting'
import Login from './Page/Login'
import WriteQA from './Page/Q&A/WriteQA'
import Manage from './Page/Manage'
import PlayInterview from './Page/PlayInterview'
import Main from './Page/Main'
import { selectTheme } from './features/themeSlice'

export default function App(): JSX.Element {
    const theme = useSelector(selectTheme)

    return (
        <>
            <GlobalStyle theme={theme} />
            <ScrollToTop />
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
                <Route path="/Plan" element={<Plan />} />
            </Routes>
        </>
    )
}
