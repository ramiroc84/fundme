import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

import ConnectBox from "./components/ConnectBox";
import Hero from "./components/Hero";
import TopTenBox from "./components/TopTenBox";

const GlobalStyle = createGlobalStyle`
html{
  overflow:hidden;
}
  body {
    background-color: aquamarine;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* overflow: hidden; */
   
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

// const ContenedorImagenes = styled.div`
//   display: flex;
//   justify-content: space-evenly;
//   align-items: center;
//   position: relative;
//   background-color: limegreen;
//   width: 100%;
//   height: 40vh;
//   top: 50%;
//   transform: translateY(-50%);
// `;

// const Imagen = styled.div`
//   width: 25%;
//   height: 100%;
//   margin: 0 2rem 0 0;
//   background-color: pink;
//   &:first-of-type {
//     margin-left: 2rem;
//   }
// `;

function App() {
  const [connected, setConnected] = useState(false);

  const connect = () => {
    setConnected((prev) => !prev);
  };

  return (
    <>
      <GlobalStyle />

      <Seccion>
        <ConnectBox
          connected={connected}
          address={"0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8"}
          manageConnection={connect}
        ></ConnectBox>
        <Hero></Hero>
        {/* <ContenedorImagenes>
          <Imagen></Imagen>
          <Imagen></Imagen>
          <Imagen></Imagen>
          <Imagen></Imagen>
        </ContenedorImagenes> */}
        <TopTenBox></TopTenBox>
      </Seccion>
      {/* <Seccion></Seccion> */}
    </>
  );
}

export default App;
