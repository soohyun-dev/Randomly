import getQuestionNums, { MakeNums } from 'utils/MakeNums'

describe('getQuestionNums 테스트', () => {
    test('질문 번호 랜덤 생성 길이 테스트', () => {
        const result = getQuestionNums(3, 10)
        expect(result[0].length).toEqual(4)
        expect(result[1].length).toEqual(3)
        expect(result[2].length).toEqual(3)
    })
})

describe('MakeNums 테스트', () => {
    it('number 만큼 반환 하는지 테스트', () => {
        const number = 5
        const result = MakeNums(number)

        expect(result.length).toEqual(number)
    })

    it('중복된 거 없이 반환하는 지 테스트', () => {
        const number = 5
        const result = MakeNums(number)

        const uniqueResult = [...new Set(result)]

        expect(result).toEqual(uniqueResult)
    })
})

describe('getQuestionNums & MakeNums 테스트', () => {
    it('반환된 result의 길이가 member의 숫자와 같은지 테스트', () => {
        const member = 3
        const question = 10
        const result = getQuestionNums(member, question)

        expect(result.length).toEqual(member)
    })

    it('반환된 숫자들 중에 중복된 숫자가 없는지 테스트', () => {
        const member = 4
        const question = 15
        const result = getQuestionNums(member, question)

        const flatResult = result.flat()
        const uniqueResult = [...new Set(flatResult)]

        expect(flatResult).toEqual(uniqueResult)
    })

    it('각 팀원에게 공평하게 분배 되는지 테스트', () => {
        const member = 4
        const question = 12
        const result = getQuestionNums(member, question)

        const lengths = result.map((subArr) => subArr.length)
        const maxDiff = Math.max(...lengths) - Math.min(...lengths)

        expect(maxDiff).toBeLessThanOrEqual(0)
    })
})
