import styled from 'styled-components'

export const ReviewPostingContent = styled.div`
    width: 15em;
    height: 17em;
    background-color: #f8f9fa;
    padding: 2em;
    border-radius: 10px;
    margin: 2em 1em;
    cursor: pointer;
    &:hover {
        box-shadow: 0px 6px 4px 2px rgba(0, 0, 0, 0.1);
        transition: 0.4s;
    }
`
export const NameContainter = styled.div`
    display: flex;
    height: 4em;
`
export const IntreviewerNameParagraph = styled.p`
    width: 8em;
    font-size: 18px;
`

export const DateParagraph = styled.p`
    width: 7em;
`

export const SelfIntroAdviseContainer = styled.div`
    height: 6em;
`
export const SelfIntroAdviseParagraph = styled.p`
    font-size: 14px;
    color: gray;
    margin: 0.2em 0;
`

export const AnswerAdviseContainer = styled.div`
    height: 6em;
`
export const AnswerAdviseParagraph = styled.p`
    font-size: 14px;
    color: gray;
    margin: 0.2em 0;
`

export const WriterContainer = styled.div`
    color: gray;
    text-align: right;
    height: 1em;
`

export const ReviewPostingButton = styled.button`
    display: none;
    border: none;
    border-radius: 5px;
    background-color: #e6e6e6;
    &:hover {
        cursor: pointer;
        opacity: 90%;
    }
`
