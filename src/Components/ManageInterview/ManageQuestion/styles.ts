import styled from 'styled-components'

export const QuestionListContainer = styled.section`
    text-align: center;
    margin: 5em 0;
`

export const QuestionInput = styled.input`
    width: 40em;
    height: 3em;
    padding-left: 1em;
    border: 2px solid #eeeeee;
    border-radius: 10px;
    margin: 2em 0 2em 5em;
`

export const Table = styled.table`
    width: 70em;
    border-top: 2px solid;
`

export const Th = styled.th`
    padding: 1em 0;
    border-bottom: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
`

export const ThNoRight = styled.th`
    padding: 1em 0;
    border-bottom: 1px solid #e0e0e0;
`

export const AddBtn = styled.button`
    width: 6em;
    height: 3em;
    margin: 0 1em;
    font-size: 14px;
    font-weight: 550;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    color: #424242;
    &:hover {
        opacity: 80%;
    }
`

export const DelelteAllSection = styled.section`
    margin: 7em 0;
`

export const DeleteAllBtn = styled.button`
    width: 140px;
    height: 50px;
    border: none;
    border-radius: 15px;
    background-color: #eeeeee;
    color: white;
    font-size: 24px;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    cursor: pointer;
    &:hover {
        opacity: 70%;
        background-color: red;
        transition: 0.5s;
    }
`

export const PreAddText = styled.p`
    margin-bottom: 5em;
    color: #777;
    font-size: 14px;
`
