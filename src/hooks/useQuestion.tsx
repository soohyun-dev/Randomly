import { selectUser } from 'features/userSlice'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { fireStore } from '../firebase'

const getQuestion = async (questionsInfo) => {
    const questionsData = await getDocs(query(questionsInfo, orderBy('time', 'asc')))
    const questions = questionsData.docs.map((docTarget: any) => ({
        ...docTarget.data(),
        id: docTarget.id,
    }))

    return questions
}

const useQuestion = (folderId) => {
    const user = useSelector(selectUser)
    const questionInfo = collection(fireStore, `users/${user}/packages/${folderId}/questions`)
    return useQuery(`questions${folderId}`, () => getQuestion(questionInfo))
}

export default useQuestion
