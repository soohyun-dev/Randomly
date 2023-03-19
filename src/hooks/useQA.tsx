import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useQuery } from 'react-query'
import { fireStore } from '../firebase'

const getQA = async (QAInfo) => {
    const QAData = await getDocs(query(QAInfo, orderBy('time', 'desc')))
    const qa = QAData.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
    }))

    return qa
}

const useQA = () => {
    const QAInfo = collection(fireStore, 'QA')
    return useQuery('qa', () => getQA(QAInfo))
}

export default useQA
