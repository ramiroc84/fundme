import React from "react";
import styled from "styled-components";

// import flechas_sprite from "../svg/flechas.svg";

const Contenedor = styled.div`
  //width: 300px;
  height: 35px;
  background-color: #f5f5f5fe;
  position: absolute;
  bottom: 70px;
  left: 80px;
  display: flex;
  align-items: center;
  /* position: fixed; */
  z-index: 10;
  padding: 10px;
  border-radius: 7px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  @media (max-width: 900px) {
    justify-content: center;
    width: 100%;
    top: 130px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 19px;
    text-align: center;
    /* white-space: nowrap; */
  }
`;

const Boton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 35px;
  font-size: 18px;
  font-weight: 700;
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
const EtiquetaBoton = styled.div``;

const InputBox = styled.input`
  width: 60px;
  height: 28px;
  border-radius: 5px;
  margin: 0 20px;
  outline: none;
  border: 1px solid #aaaaaa;
  padding-right: 10px;
  background-color: transparent;
  resize: none;
  text-align: right;
  font-size: 18px;

  &:invalid {
    background-color: #f29393;
  }
`;

const Unidad = styled.div`
  position: absolute;
  font-size: 10px;
  font-weight: 700;
  /* background-color: red; */
  bottom: 15px;
  left: 107px;
  color: #222222;
  @media (max-width: 900px) {
    left: 311px;
    /* white-space: nowrap; */
  }
`;

const TransferBox = ({ connected, owner }) => {
  return (
    <>
      {connected ? (
        <Contenedor>
          <InputBox pattern="[0-9]+([\.,][0-9]+)?"></InputBox>
          <Unidad>eth</Unidad>
          <Boton>
            <EtiquetaBoton>donate</EtiquetaBoton>
          </Boton>
          {owner ? (
            <Boton backgroundColor={"#F65A83"}>
              <EtiquetaBoton>withdraw</EtiquetaBoton>
            </Boton>
          ) : (
            <></>
          )}
        </Contenedor>
      ) : (
        <></>
      )}
    </>
  );
};

export default TransferBox;
