import Footer from 'Components/Footer'
import Nav from 'Components/Nav'
import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDateTime } from 'utils/getTime'
import { fireStore } from '../../../firebase'
import { ContentTextArea, Title, WriteNoticeSection } from './styles'
import { NewData } from './types'

export default function WriteNotice() {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const noticeInfo = collection(fireStore, 'notice')
    const navigate = useNavigate()

    const addNotice = async () => {
        if (window.confirm('글작성을 완료하시겠습니까?')) {
            const newData: NewData = {}
            newData.title = title
            newData.content = content.replaceAll('\n', '<br>')
            newData.time = new Date()
            newData.date = getDateTime()
            await addDoc(noticeInfo, newData)
            alert('글 작성이 완료되었습니다.')
            navigate('/QAPage')
        }
    }

    return (
        <>
            <Nav />
            <WriteNoticeSection>
                <div>
                    <Title>공지사항 작성</Title>
                </div>
                <div>
                    <div>
                        <label>제목</label>
                        <input
                            value={title}
                            placeholder="제목"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <p>내용</p>
                        <ContentTextArea
                            value={content}
                            placeholder="내용"
                            rows="2"
                            cols="20"
                            wrap="hard"
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <button type="button" onClick={addNotice}>
                        글 작성
                    </button>
                </div>
            </WriteNoticeSection>
            <Footer />
        </>
    )
}
