import React from "react";
import styled from "styled-components";

import flechas_sprite from "../svg/flechas.svg";

const Contenedor = styled.div`
  //width: 300px;
  height: 35px;
  background-color: #f5f5f5fe;
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 10;
  padding: 10px;
  border-radius: 7px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
`;

const EtiquetaDireccion = styled.div`
  height: 50%;
  text-align: center;
  /* width: 500px; */
  display: flex;
  margin-right: 17px;
`;

const Boton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 30px;
  font-size: 18px;
  border-radius: 7px;
  /* display: block; */
  /* margin-right: 20px; */
  margin: 0 20px;
  background-color: ${(props) => props.backgroundColor || "#00d1b2"};
  border-color: transparent;
  color: #fff;
  transition: all 0.2s ease-out;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  &:active {
    transform: scale(0.9);
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
`;

const Flecha = styled.svg`
  width: 30px;
  height: 30px;
  transform: rotateZ(-120deg);
  fill: #ffffffaa;
  position: absolute;
  top: 85px;
  right: ${(props) => props.offsetRight || "30px"};
`;

const EtiquetaBoton = styled.div``;

const Hint = styled.div`
  color: white;
  position: absolute;
  font-family: "Gloria Hallelujah", cursive;
  font-size: 15px;
  top: 90px;
  right: ${(props) => props.offsetRight || "60px"};
  z-index: 12;
`;

const ConnectBox = ({ connected, address, manageConnection }) => {
  return (
    <Contenedor>
      {connected ? (
        <>
          <Boton backgroundColor={"#F65A83"} onClick={manageConnection}>
            <EtiquetaBoton>disconnect</EtiquetaBoton>
          </Boton>
          <EtiquetaDireccion>{address}</EtiquetaDireccion>
          <Hint offsetRight={"400px"}>
            after donating <br />
            you can disconnect
          </Hint>
          <Flecha offsetRight={"380px"}>
            <use href={flechas_sprite + "#icon-forward1"} />
          </Flecha>
        </>
      ) : (
        <>
          <Hint>
            you can connect <br />
            to your wallet
          </Hint>
          <Flecha>
            <use href={flechas_sprite + "#icon-forward1"} />
          </Flecha>
          <Boton onClick={manageConnection}>
            <EtiquetaBoton>connect</EtiquetaBoton>
          </Boton>
        </>
      )}
    </Contenedor>
  );
};

export default ConnectBox;
