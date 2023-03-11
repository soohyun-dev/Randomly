import Footer from 'Components/Footer'
import Nav from 'Components/Nav'
import { Link, useLocation } from 'react-router-dom'
import {
    ContentDiv,
    DateDiv,
    DateText,
    DivLine,
    LinkDiv,
    LinkText,
    PostingDiv,
    PostingSection,
    TitleDiv,
    WriteText,
} from './styles'

export default function NoticePosting() {
    const location = useLocation()
    const { title, date, content } = location.state

    return (
        <>
            <Nav />
            <PostingSection>
                <PostingDiv>
                    <TitleDiv>
                        <div>
                            <h1>{title}</h1>
                        </div>
                    </TitleDiv>

                    <DateDiv>
                        <div>
                            <DateText>{date}</DateText>
                            <WriteText>운영진</WriteText>
                        </div>
                    </DateDiv>
                    <DivLine />
                    <ContentDiv>
                        <div>
                            {content.split('\n').map((v) => {
                                return v === '' ? <br /> : <p>{v}</p>
                            })}
                        </div>
                    </ContentDiv>
                    <LinkDiv>
                        <div>
                            <Link to="/QAPage" style={{ textDecoration: 'none', color: 'black' }}>
                                <LinkText>⬅️ 목록으로</LinkText>
                            </Link>
                        </div>
                    </LinkDiv>
                </PostingDiv>
            </PostingSection>
            <Footer />
        </>
    )
}
