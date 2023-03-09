/**
 * 사용자가 카테고리별 균등 분배 선택시 분배해주는 기능
 *
 * @param memberLength
 * @returns 카테고리별로 균등 분배한 배열
 */

import { shuffleArray } from './MakeNums'

interface Question {
    catagory: object
}

export default function getEqualDistribution(memberLength, questions) {
    const Catagory = {}
    Object.keys(questions).forEach((idx) => {
        console.log(questions[idx])
        if (Catagory[questions[idx].catagory] === undefined) {
            Catagory[questions[idx].catagory] = [+idx]
        } else {
            Catagory[questions[idx].catagory].push(+idx)
        }
    })

    const shuffleResult = Array.from({ length: memberLength }, () => [])
    let idx = 0
    Object.keys(Catagory).forEach((title) => {
        const result = shuffleArray(Catagory[title])
        result.forEach((questionNum) => {
            shuffleResult[idx].push(questionNum)
            idx += 1
            if (idx >= memberLength) idx = 0
        })
    })

    return shuffleResult
}
