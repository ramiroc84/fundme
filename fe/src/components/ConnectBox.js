import React from "react";
import styled from "styled-components";

const Contenedor = styled.div`
  //width: 300px;
  height: 35px;
  background-color: yellowgreen;
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  align-items: center;
`;

const EtiquetaDireccion = styled.div`
  height: 50%;
  text-align: center;
  width: 500px;
  display: flex;
`;

const Boton = styled.button`
  width: 120px;
  height: 100%;
  font-size: 21px;
  border-radius: 4px;
  margin-right: 20px;
`;

const ConnectBox = () => {
  return (
    <Contenedor>
      <Boton>Connect</Boton>
      <EtiquetaDireccion>
        Address: 0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8
      </EtiquetaDireccion>
    </Contenedor>
  );
};

export default ConnectBox;
