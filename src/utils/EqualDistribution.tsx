/**
 * 사용자가 카테고리별 균등 분배 선택시 분배해주는 기능
 *
 * @param memberLength
 * @returns 카테고리별로 균등 분배한 배열
 */

import { shuffleArray } from './MakeNums'

interface Question {
    catagory: string
}

export default function getEqualDistribution(
    memberLength: number,
    questions: Record<string, Question>
) {
    const Catagory: Record<string, number[]> = {}

    Object.keys(questions).forEach((idx) => {
        const catagory = questions[idx].catagory

        if (!Catagory[catagory]) {
            Catagory[catagory] = [+idx]
        } else {
            Catagory[catagory].push(+idx)
        }
    })

    const shuffleResult: number[][] = Array.from({ length: memberLength }, () => [])
    let idx = 0

    Object.values(Catagory).forEach((catagory) => {
        const result = shuffleArray(catagory)
        result.forEach((questionNum) => {
            shuffleResult[idx].push(questionNum)
            idx = (idx + 1) % memberLength
        })
    })

    return shuffleResult
}
