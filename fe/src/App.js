import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html{
  overflow:hidden;
}
  body {
    background-color: aquamarine;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow:hidden;
   
    font-family: 'Roboto', sans-serif;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  }
`;

const Seccion = styled.div`
  height: 100vh;
  width: 100%;
  background-color: orange;
  position: relative;
`;

const ContenedorImagenes

function App() {
  return (
    <>
      <GlobalStyle />

      <Seccion>FUNDME</Seccion>
    </>
  );
}

export default App;
