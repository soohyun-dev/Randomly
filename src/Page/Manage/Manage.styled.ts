import styled from 'styled-components'

export const ManageHeaderSection = styled.section`
    text-align: center;
`

export const ManageHeaderDiv = styled.div`
    text-align: center;
    display: inline;
`

export const TitleSection = styled.section`
    margin-bottom: 3em;
    text-align: center;
`

export const Title = styled.h1`
    font-size: 48px;
    margin: 3em 0 2em 0;
`

export const ManageAccessSection = styled.section`
    text-align: center;
    margin: 5em 0;
`

export const ManageAccessTitle = styled.label`
    margin: 0 1em;
`

export const FolderOrderBox = styled.div`
    margin: 6em 0 3em 0;
`

export const FolderPlusButton = styled.button`
    width: 10em;
    height: 3em;
    border: none;
    border-radius: 10px;
    background-color: #f5f5f5;
    cursor: pointer;
    &:hover {
        opacity: 70%;
    }
`

export const FolderUpdateButton = styled(FolderPlusButton)`
    margin: 0 1em;
`

export const FolderDeleteButton = styled.button`
    margin: 1em 0;
    padding: 0.5em 0;
    background-color: #ecdfdf;
    border: none;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
`

export const PackageSection = styled.section`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

export const PackageTitleDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 5em 0;
`

export const PackageTitleText = styled.p`
    font-size: 24px;
`

export const PackageDiv = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

export const PackageBox = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 15em;
    height: 10em;
    border: none;
    border-radius: 10px;
    background-color: #f5f5f5;
    margin: 2em 1em;
    cursor: pointer;
    &:hover {
        box-shadow: 0px 6px 4px 2px rgba(0, 0, 0, 0.1);
        transition: 0.3s;
    }
`

export const PackageTitle = styled.div`
    font-size: 20px;
    margin: 1em 0;
`

export const PackageDate = styled.div`
    color: #777;
`

export const FolderNameModalSection = styled.section`
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
