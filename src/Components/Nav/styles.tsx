import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface Scroll {
    scroll: string
}

export const TopHeader = styled.header<Scroll>`
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 1000;
    display: grid;
    grid-template-columns: 1fr 2.2fr 0.5fr 0.3fr;
    padding: 15px 15px 10px 15px;
    font-size: 28px;
    color: ${(props) => (props.scroll === 'origin' ? 'white' : 'black')};
    background-color: ${(props) => (props.scroll === 'origin' ? '' : 'white')};
    box-shadow: ${(props) => (props.scroll === 'origin' ? '' : '0px 4px 4px rgba(0, 0, 0, 0.06)')};
    text-align: center;
    align-items: center;
    &:visited {
        text-decoration: none;
        color: black;
    }
`

export const LinkText = styled(Link)<Scroll>`
    text-decoration: none;
    color: ${(props) => (props.scroll === 'origin' ? 'white' : 'black')};
`

export const Logo = styled.div`
    font-weight: bold;
`

export const LogoText = styled.p<Scroll>`
    color: ${(props) => (props.scroll === 'origin' ? 'white' : '#3f76ff')};
`

export const Menu = styled.div`
    display: flex;
    justify-content: center;
    font-size: 16px;
`

export const MenuText = styled.p`
    font-weight: 500;
    padding: 0 1.5em;
    &:hover {
        font-weight: bold;
        transition: 0.8s;
    }
`

export const Option = styled.div`
    font-size: 16px;
`

export const Logout = styled.button`
    background-color: #ef9a9a;
    padding: 0.5em 0.5em;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    &:hover {
        opacity: 70%;
    }
`

export const ThemeDiv = styled.div`
    cursor: pointer;
`
