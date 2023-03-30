import styled from 'styled-components'

export const ReviewFormSection = styled.section`
    border-top: 1px solid var(--div-line);
    padding-top: 4em;
    display: flex;
    justify-content: center;
`

export const ReviewFormTitle = styled.p`
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 1em;
`

export const ReviewUserBox = styled.div`
    display: flex;
    margin-bottom: 1em;
`

export const ReviewToBox = styled.div`
    margin: 1em 1.5em 1em 0;
`

export const ReviewUserInput = styled.input`
    width: 19em;
    height: 2.5em;
    margin-top: 0.5em;
    padding-left: 0.5em;
    border: 1px solid gray;
    border-radius: 8px;
`

export const ReviewAdviseTextArea = styled.textarea`
    width: 40em;
    height: 30em;
    margin: 1em 1.5em 0 0;
    padding: 0.5em;
    border: 1px solid gray;
    border-radius: 8px;
`
export const ReviewFormButtonBox = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 1.5em;
`

export const ReviewFormButton = styled.button`
    width: 8em;
    height: 3em;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
`
