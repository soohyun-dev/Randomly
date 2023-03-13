import { getDate, getTime, getDateTime } from 'utils/GetTime'

describe('getDate 함수 테스트', () => {
    it('"yyyy-mm-dd" format 테스트', () => {
        const today = new Date()
        const expectedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`
        expect(getDate()).toEqual(expectedDate)
    })
})

describe('getTime 함수 테스트', () => {
    it('"hh-mm-ss" format 테스트', () => {
        const today = new Date()
        const expectedTime = `${today.getHours().toString().padStart(2, '0')}:${today
            .getMinutes()
            .toString()
            .padStart(2, '0')}:${today.getSeconds().toString().padStart(2, '0')}`
        expect(getTime()).toEqual(expectedTime)
    })
})

describe('getDateTime 함수 테스트', () => {
    it('"yyyy-mm-dd hh-mm--ss" format 테스트', () => {
        const today = new Date()
        const expectedDateTime = `${today.getFullYear()}-${(today.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')} ${today
            .getHours()
            .toString()
            .padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}:${today
            .getSeconds()
            .toString()
            .padStart(2, '0')}`
        expect(getDateTime()).toEqual(expectedDateTime)
    })
})
