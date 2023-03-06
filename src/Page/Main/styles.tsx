import styled from 'styled-components'

export const TitleSection = styled.section`
    margin: 15em 10em 10em 10em;
    text-align: left;
`

export const TopDiv = styled.div`
    color: black;
    margin-bottom: 18em;
    ::before {
        content: '';
        background: url('https://user-images.githubusercontent.com/81623931/216887726-da970003-fdb4-4c58-ac30-bd096af0b7ce.png');
        background-size: cover;
        margin: 6.3em 0;
        width: 100%;
        height: 44em;
        opacity: 0.4;
        position: absolute;
        top: -11%;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }
`

export const Title = styled.p`
    position: relative;
    font-size: 48px;
    font-weight: 600;
`

export const TitleContentDiv = styled.div`
    position: relative;
    margin: 3em 0;
`

export const TitleContent = styled.p`
    position: relative;
    font-size: 26px;
    font-weight: 500;
    color: var(--gray-text);
`

export const Img = styled.img`
    margin: 5em 0;
    width: 100%;
    border-radius: 10px;
    box-shadow: 5px 5px 3px #f5f5f5;
`

export const ImgContentBoxDiv = styled.div`
    margin: 3em 0 3em 0;
    display: inline-block;
`

export const ImgContentBox = styled.div`
    display: flex;
    align-items: center;
`

export const ImgBox = styled.div`
    width: 55%;
    display: inline-block;
`

export const ContentBox = styled.div`
    width: 40%;
    display: inline-block;
    margin-left: 3em;
`

export const ContentBoxTitleLogoFirst = styled.p`
    font-size: 40px;
`

export const ContentBoxTitleLogo = styled.p`
    font-size: 50px;
`

export const ContentBoxTitle = styled.p`
    font-size: 30px;
    font-weight: 600;
    margin: 1em 0;
`

export const ContentBoxText = styled.p`
    font-size: 20px;
    color: #777;
`
