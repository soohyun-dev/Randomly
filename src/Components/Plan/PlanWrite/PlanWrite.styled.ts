import styled from 'styled-components'

export const PlanWriteBox = styled.div`
    width: 60%;
    margin: 5em;
    padding: 2em;
    border: 2px solid #d2e3fc;
    border-radius: 15px;
`

export const PlanWriteTitleBox = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2em;
`

export const PlanWriteTitleParagraph = styled.p`
    font-size: 24px;
    font-weight: 600;
`

export const PlanWriteInputBox = styled.div`
    display: flex;
    justify-content: center;
`

export const PlanDateBox = styled.div`
    width: 45%;
    margin-top: 0.5rem;
`

export const PlanInfoBox = styled.div`
    width: 45%;
    text-align: center;
`

export const PlanWriteInput = styled.input`
    margin: 0.5em;
    padding: 1em;
    width: 80%;
    border: 2px solid #d2e3fc;
    border-radius: 15px;
`

export const PlanWriteSubmitButton = styled.button`
    margin-top: 4em;
    width: 100%;
    font-size: 16px;
    padding: 0.8em 0.6em;
    background-color: #3f76ff;
    color: #fff;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
        opacity: 0.9;
    }
`
