import Footer from 'Components/Footer/Footer'
import Memo from 'Components/Memo/Memo'
import Nav from 'Components/Nav/Nav'
import Notice from 'Components/Notice/Notice/Notice'
import QA from 'Components/Q&A/QA/QA'
import ErrorPage from 'Page/Error'
import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { CatagoryButton, CatagoryDiv, PostListDiv, QASection } from './styles'

export default function QAPage() {
    const [nowPage, setNowPage] = useState('공지사항')
    const Catagory = ['공지사항', 'Q&A', '남길말']

    const changeBtnColor = () => {
        Catagory.map((v) => {
            const items = document.getElementById(v)
            if (items !== null) {
                if (v === nowPage) {
                    items.style.backgroundColor = '#bdbdbd'
                } else {
                    items.style.backgroundColor = '#f5f5f5'
                }
            }
        })
    }

    const showComponent = () => {
        switch (nowPage) {
            case '공지사항':
                return <Notice />
            case 'Q&A':
                return <QA />
            case '남길말':
                return <Memo />
            default:
        }
    }

    useEffect(() => {
        changeBtnColor()
    }, [nowPage])

    return (
        <>
            <Nav />
            <ErrorBoundary FallbackComponent={ErrorPage}>
                <QASection>
                    <div>
                        <CatagoryDiv>
                            <CatagoryButton
                                id="공지사항"
                                onClick={(e) => {
                                    setNowPage('공지사항')
                                }}
                            >
                                공지사항
                            </CatagoryButton>

                            <CatagoryButton
                                id="Q&A"
                                onClick={(e) => {
                                    setNowPage('Q&A')
                                }}
                            >
                                Q&A
                            </CatagoryButton>
                            {/* <CatagoryButton
              id="남길말"
              onClick={(e) => {
                setNowPage("남길말");
              }}
            >
              남길 말
            </CatagoryButton> */}
                        </CatagoryDiv>
                        <PostListDiv>{showComponent()}</PostListDiv>
                    </div>
                </QASection>
            </ErrorBoundary>
            <Footer />
        </>
    )
}
