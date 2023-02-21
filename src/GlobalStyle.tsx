import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0rem;
  }

  body{
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    background-color: ${({ theme }) => (theme ? "#2D3436;" : "white")}
    color: #bdc1c6;
  }

  button{
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  }
`;

export default GlobalStyle;
