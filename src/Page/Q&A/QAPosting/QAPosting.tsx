import Footer from 'Components/Footer/Footer'
import Nav from 'Components/Nav/Nav'
import WriteComment from 'Components/Q&A/WriteComment/WriteComment'
import { selectUser } from 'features/userSlice'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import QAComment from '../../../Components/Q&A/QAComment/QAComment'
import {
    ContentDiv,
    DateText,
    DivLine,
    PostingDiv,
    PostingSection,
    TitleDiv,
    WriterDiv,
    WriterText,
} from './styles'

export default function QAPosting() {
    const location = useLocation()
    const { id, title, date, content, qaWriter, idx } = location.state
    const user = useSelector(selectUser)

    return (
        <>
            <Nav />
            <PostingSection>
                <PostingDiv>
                    <TitleDiv>
                        <p>{title}</p>
                    </TitleDiv>
                    <WriterDiv>
                        <DateText>{date}</DateText>
                        <WriterText>{qaWriter}</WriterText>
                    </WriterDiv>
                    <DivLine />
                    <ContentDiv>
                        <p>{content}</p>
                    </ContentDiv>
                    <DivLine />
                </PostingDiv>
                {user === null ? '' : <WriteComment id={id} />}
                <QAComment id={id} />
            </PostingSection>
            <Footer />
        </>
    )
}
