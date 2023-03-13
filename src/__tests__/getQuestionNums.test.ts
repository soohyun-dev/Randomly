import getQuestionNums from 'utils/MakeNums'

describe('getQuestionNums', () => {
    test('질문 번호 랜덤 생성 길이 테스트', () => {
        const result = getQuestionNums(3, 10)
        expect(result[0].length).toEqual(4)
        expect(result[1].length).toEqual(3)
        expect(result[2].length).toEqual(3)
    })
})
