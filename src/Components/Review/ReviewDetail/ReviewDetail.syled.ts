import styled from 'styled-components'

export const ReviewDetailSection = styled.section`
    padding: 0.5em 1em 0.5em 2em;
    width: 36em;
    height: 37em;

    /* 최상단 위치 */
    z-index: 999;

    /* 중앙 배치 */
    /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
    /* translate는 본인의 크기 기준으로 작동한다. */
    position: fixed;
    top: 54%;
    left: 50%;
    transform: translate(-50%, -50%);

    /* 모달창 디자인 */
    background-color: #e6e6e6;
    border: none;
    border-radius: 5px;
`
export const ReviewDetailButton = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
`

export const CloseButtonBox = styled.div`
    display: flex;
    justify-content: end;
`

export const ReviewDetailCloseButton = styled.button`
    position: right;
    border: none;
    border-radius: 8px;
    padding: 0.3em 0.7em;
    cursor: pointer;
    &:hover {
        opacity: 90%;
    }
`
export const ReviewDetailNameBox = styled.div`
    display: flex;
    justify-content: center;
    font-size: 18px;
`

export const ReviewDetailDateBox = styled.div`
    display: flex;
    justify-content: end;
    padding: 0 1em;
    color: gray;
`

export const ReviewDetailAdviseBox = styled.div`
    padding: 2em 0;
    height: 9em;
`

export const ReviewDetailAdvise2Box = styled.div`
    padding: 2em 0;
    height: 14em;
`

export const ReviewDetailWriterBox = styled.div`
    display: flex;
    justify-content: end;
    padding: 0 1em;
    color: gray;
`
export const ReviewDetailParagraph = styled.p`
    padding-bottom: 0.5em;
    color: gray;
    font-size: 14px;
`
