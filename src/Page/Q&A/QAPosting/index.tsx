import Nav from 'Components/Nav'
import QAComment from 'Components/Q&A/QAComment'
import WriteComment from 'Components/Q&A/WriteComment'
import { selectUser } from 'features/userSlice'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Footer from '../../../Components/Footer'

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
                        {content.split('\n').map((v) => {
                            return v === '' ? <br /> : <p>{v}</p>
                        })}
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
