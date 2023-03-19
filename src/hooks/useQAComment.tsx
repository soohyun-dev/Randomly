import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useQuery } from 'react-query'
import { fireStore } from '../firebase'

const getQAComment = async (QACommentInfos) => {
    const QACommentData = await getDocs(query(QACommentInfos, orderBy('time', 'asc')))
    const QAComment = QACommentData.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
    }))

    return QAComment
}

const useQAComment = (id) => {
    const QACommentInfos = collection(fireStore, `QA/${id}/comment`)
    return useQuery(`qaComment${id}`, () => getQAComment(QACommentInfos))
}

export default useQAComment
