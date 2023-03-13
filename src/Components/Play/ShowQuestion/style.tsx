import styled from 'styled-components'

export const QuestionBlock = styled.div`
    display: inline-block;
    line-height: 35px;
`

export const QuestionText = styled.p<{ color: any }>`
    font-size: 21px;
    font-weight: 600;
    margin: 40px 15px;
    padding: 10px 20px;
    cursor: pointer;
    color: ${(props) => (props.color ? 'blue' : 'black')};
    display: flex;
`

export const ShowBtn = styled.button<{ color: any }>`
    width: 80px;
    padding: 8px 0;
    margin-right: 20px;
    cursor: pointer;
    border-radius: 10px;
    border: none;
    background-color: ${(props) => (props.color ? '#ef5350' : '#66bb6a')};
    color: white;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-size: 14px;
    font-weight: 600;
    &:hover {
        opacity: 70%;
    }
`

export const CorrectBtn = styled.button<{ color: any }>`
    width: 3em;
    padding: 4px 0;
    margin-left: 1em;
    border-radius: 10px;
    border: none;
    background-color: ${(props) => (props.color ? '#ff8a80' : '#64b5f6')};
    color: white;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-size: 17px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        opacity: 80%;
    }
`

export const QuestionCatagoryLabel = styled.label`
    font-size: 16px;
    color: gray;
    line-height: 35px;
    margin-left: 5px;
`
