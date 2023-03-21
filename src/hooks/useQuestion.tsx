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
    const queryEnabled = Boolean(user && folderId)
    const questionInfo = queryEnabled
        ? collection(fireStore, `users/${user}/packages/${folderId}/questions`)
        : null
    const question = useQuery(
        `questions${folderId}`,
        () => (folderId ? getQuestion(questionInfo) : []),
        {
            enabled: !!folderId,
        }
    )

    return question.data !== undefined ? question : { isLoading: true, isError: false, data: [] }
}

export default useQuestion
