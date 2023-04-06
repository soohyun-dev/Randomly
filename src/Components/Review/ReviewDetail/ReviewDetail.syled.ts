import styled from 'styled-components'

export const ReviewDetailSection = styled.section`
    display: block;
    padding: 0.5em;
    z-index: 999;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #e6e6e6;
    border: none;
    border-radius: 5px;
    opacity: 100%;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: gray;
    }
`

export const ReviewDetailBox = styled.div`
    width: 44em;
    height: 40em;
    background-color: white;
    padding: 0.5em 1em 0.5em 2em;
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

export const ReviewDetailAdvise = styled.div`
    height: 33rem;
    overflow-y: auto;
`

export const ReviewDetailAdviseBox = styled.div`
    padding: 2em 0;
    min-height: 10em;
`

export const DivideLine = styled.hr`
    margin-bottom: 0.5em;
    opacity: 0.3;
`

export const ReviewDetailAdvise2Box = styled.div`
    padding-bottom: 2em;
    min-height: 11em;
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
export const ReviewModifyButton = styled.button`
    border: none;
    border-radius: 5px;
    margin-right: 0.5em;
    cursor: pointer;
`
export const ReviewPasswordInput = styled.input`
    border: 0.5px solid gray;
    border-radius: 5px;
    margin-right: 0.5em;
    padding: 0.5em;
`
