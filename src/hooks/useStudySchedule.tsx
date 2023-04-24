import { selectUser } from 'features/userSlice'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { fireStore } from '../firebase'

const getStudySchedule = async (studyScheduleInfo) => {
    const studyScheduleData = await getDocs(query(studyScheduleInfo, orderBy('uploadDate', 'desc')))
    const studySchedule = studyScheduleData.docs.map((docTarget: any) => ({
        ...docTarget.data(),
        id: docTarget.id,
    }))

    return studySchedule
}

const useStudySchedule = () => {
    const user = useSelector(selectUser)
    const studyScheduleInfo = collection(fireStore, `users/${user}/studySchedule`)
    const studySchedule = useQuery(`studySchedule/${user}`, () =>
        getStudySchedule(studyScheduleInfo)
    )

    return studySchedule.data !== undefined
        ? studySchedule
        : { isLoading: true, isError: false, data: [] }
}

export default useStudySchedule
