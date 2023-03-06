/**
 * 현재 날짜를 리턴하는 함수이다.
 * @param {None}
 * @returns yyyy-mm-dd
 */

export function getDate() {
    const time = new Date()
    const year = time.getFullYear()
    const month = `0${time.getMonth() + 1}`.slice(-2)
    const day = `0${time.getDate()}`.slice(-2)

    return `${year}-${month}-${day}`
}

/**
 * 현재 시간을 리턴하는 함수이다.
 * 시간은 24시간제이다.
 * @param {None}
 * @returns hh-mm-ss
 */
export function getTime() {
    const time = new Date()
    const hours = `0${time.getHours()}`.slice(-2)
    const minutes = `0${time.getMinutes()}`.slice(-2)
    const seconds = `0${time.getSeconds()}`.slice(-2)

    return `${hours}:${minutes}:${seconds}`
}

/**
 * 현재 날짜와 시간을 합쳐서 리턴하는 함수이다.
 * 데이터를 저장하는 시간을 넣어줄 때 주로 사용한다.
 * @param {None}
 * @returns yyyy-mm-dd hh-mm--ss
 */
export function getDateTime() {
    return `${getDate()} ${getTime()}`
}
