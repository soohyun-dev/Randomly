import styled from 'styled-components'

export const UserInput = styled.input`
    width: 40em;
    height: 3em;
    padding-left: 1em;
    border: 2px solid #eeeeee;
    border-radius: 10px;
    margin: 2em 0 5em 5em;
`

export const UserListContainer = styled.div`
    text-align: center;
    margin: 5em 0;
`

export const AddBtn = styled.button`
    width: 7em;
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
