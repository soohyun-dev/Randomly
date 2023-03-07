import Footer from 'Components/Footer'
import Nav from 'Components/Nav'
import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from 'Features/userSlice'
import { getDateTime } from 'Utils/getTime'
import { fireStore } from '../../../firebase'
import { Title, WriteNoticeSection } from './styles'
import { NewData } from './types'

export default function WriteQA() {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const QAInfo = collection(fireStore, 'QA')
    const navigate = useNavigate()
    const qaWriter = useSelector(selectUser)

    const addQA = async () => {
        if (window.confirm('글작성을 완료하시겠습니까?')) {
            const newData: NewData = {}
            newData.title = title
            newData.content = content
            newData.time = new Date()
            newData.date = getDateTime()
            newData.qaWriter = qaWriter
            let docId = ''
            await addDoc(QAInfo, newData).then((doc) => {
                docId = doc.id
            })
            await addDoc(collection(fireStore, `QA/${docId}/comment`), {})
            alert('글 작성이 완료되었습니다.')
            navigate('/QAPage')
        }
    }

    //   const addComment = async ()=> {
    //     const QAInfo = collection(fireStore, "QA");
    //     await addDoc(,)
    //   }

    return (
        <>
            <Nav />
            <WriteNoticeSection>
                <div>
                    <Title>QA 작성</Title>
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
                        <label>내용</label>
                        <input
                            value={content}
                            placeholder="내용"
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <button onClick={addQA}>글 작성</button>
                </div>
            </WriteNoticeSection>
            <Footer />
        </>
    )
}
