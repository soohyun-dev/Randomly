import styled from 'styled-components'

export const Title = styled.h1`
    font-size: 48px;
    margin: 3em 0 2em 0;
`

export const PageGuide = styled.p`
    font-size: 17px;
    padding: 1em 0;
    //   &:hover {
    //     font-size: 24px;
    //     transition: 0.8s;
    //   }
`

export const MainContainer = styled.div`
    margin: 7em 7em;
`

export const ShuffleName = styled.button`
    cursor: pointer;
    width: 180px;
    height: 50px;
    margin-bottom: 1em;
    color: #ffff;
    background-color: #03a9f4;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    &:hover {
        opacity: 80%;
    }
`

export const OrderContainer = styled.div`
    text-align: center;
`

export const MakeQuestionNums = styled.button<{
    color: any
    onClick: any
}>`
    cursor: pointer;
    width: 180px;
    height: 50px;
    margin-bottom: 2em;
    color: white;
    background-color: ${({ color }) => (color ? '#009688' : '#448aff')};
    border: none;
    border-radius: 10px;
    font-size: 20px;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    &:hover {
        opacity: 70%;
    }
`

export const GuideToggle = styled.p`
    margin: 2em 0 5em 0;
`

export const ManageAccessSection = styled.section`
    display: felx;
    justify-content: center;
    margin: 5em 0;
`

export const ManageAccessTitle = styled.label`
    margin: 0 1em;
    font-size: 24px;
`

export const LinkLoginBtn = styled.p`
    height: 3em;
    margin: 4em 0;
    line-height: 3em;
    background-color: #f5f5f5;
    border: none;
    border-radius: 10px;
    &:hover {
        opacity: 70%;
    }
`

export const USER = styled.div`
    display: inline-block;
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

export const CatagoryCheckInput = styled.input`
    line-height: 8em;
    margin-left: 10px;
    transform: scale(1.5);
    cursor: pointer;
`
