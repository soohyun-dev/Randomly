import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useQuery } from 'react-query'
import { fireStore } from '../firebase'

const getReview = async (reviewInfo) => {
    const reviewData = await getDocs(query(reviewInfo, orderBy('time', 'desc')))
    const review = reviewData.docs.map((docTarget: any) => ({
        ...docTarget.data(),
        id: docTarget.id,
    }))

    return review
}

const useReview = () => {
    const reviewInfo = collection(fireStore, `review`)
    const review = useQuery(`review`, () => getReview(reviewInfo))

    return review
}

export default useReview
