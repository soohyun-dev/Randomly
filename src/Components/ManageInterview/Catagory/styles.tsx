import styled from 'styled-components'

interface Choose {
    select?: string
}

export const CatagoryBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const CatagoryButton = styled.button<Choose>`
    height: 2em;
    padding: 0 1em;
    border: none;
    border-radius: 10px;
    margin: 1em 1em;
    color: ${(props) => (props.select === 'choose' ? 'white' : '')};
    background-color: ${(props) => (props.select === 'choose' ? 'gray' : '')};
    cursor: pointer;
    &:hover {
        opacity: 0.9;
    }
`

export const NewCatagoryInput = styled.input`
    padding-left: 5px;
    border: solid 0.5px gray;
    width: 15em;
    height: 2em;
    border-radius: 5px;
`

export const CatagoryPlusButton = styled.button`
    margin: 0 0.5em;
    border: none;
    cursor: pointer;
    &:hover {
        opacity: 0.9;
    }
`

export const CatagoryUpdateButton = styled.button`
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        opacity: 0.9;
    }
`

export const CatagoryDeleteButton = styled.button`
    margin-left: 0.5em;
    border: none;
    background-color: transparent;
    cursor: pointer;
`
