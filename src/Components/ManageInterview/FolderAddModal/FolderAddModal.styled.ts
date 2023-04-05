import styled from 'styled-components'

export const FolderNameModalSection = styled.section`
    display: block;
    padding: 2em 3em;
    z-index: 999;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #e6e6e6;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    opacity: 100% !important;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    text-align: center;
`

export const FolderModalInput = styled.input`
    margin-top: 3em;
    border: 0.5px solid gray;
    border-radius: 5px;
`

export const FolderModalButton = styled.button`
    margin: 3em 0.5em 0.5em 0;
    border: 0.5px solid gray;
    border-radius: 5px;
    cursor: pointer;
`
