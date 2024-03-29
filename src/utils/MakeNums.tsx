/**
 * 입력된 1 ~ N 배열을 섞어서 랜덤배열한다.
 * @param {Array} 생성된 배열 순차적인 배열
 * @returns 입력된 배열 shuffle한 배열
 */

export const shuffleArray = (array: number[]): number[] => {
    return array.sort(() => Math.random() - 0.5)
}

/**
 * 입력된 N 만큼 1부터 N까지 숫자들을 만든다.
 * @param {Number} 입력된 질문 갯수
 * @returns shuffle된 배열
 */

export function MakeNums(number: number): number[] {
    const nums: number[] = Array.from({ length: number }, (_, i) => i)
    return shuffleArray(nums)
}

/**
 * 질문의 갯수 N을 입력받아, 팀원에게 랜덤의 숫자를 균등하게 배분
 * @param {Number} 질문의 갯수
 * @param {Number} 팀원 숫자
 * @returns 각 팀원에게 할당할 질문 번호들이 담긴 2차원 배열
 */

export default function getQuestionNums(member: number, question: number) {
    const numArr: number[] = MakeNums(question)
    const result: Array<number[]> = Array.from({ length: member }, () => [])
    const cnt: number = +(question / member) + (question % member === 0 ? 0 : 1)

    for (let i = 0; i < cnt; i += 1) {
        result.forEach((_, idx) => {
            if (numArr.length !== 0) {
                result[idx].push(numArr.splice(0, 1)[0])
            }
        })
    }

    return result
}
