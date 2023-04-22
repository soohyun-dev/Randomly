import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useQuery } from 'react-query'
import { fireStore } from '../firebase'

const getNotice = async (noticeInfo) => {
    const noticeData = await getDocs(query(noticeInfo, orderBy('time', 'desc')))
    const notice = noticeData.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
    }))

    return notice
}

const useNotice = () => {
    const noticeInfo = collection(fireStore, 'notice')
    return useQuery('notice', () => getNotice(noticeInfo), {
        staleTime: 5 * 60 * 1000, // 5분
    })
}

export default useNotice
