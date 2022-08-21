import React from "react";
import styled from "styled-components";

const Contenedor = styled.div`
  position: absolute;
  right: 100px;
  top: 200px;
  color: white;
`;
const Valor = styled.div`
  font-size: 54px;
`;
const Numero = styled.span``;
const Unidad = styled.span`
  font-size: 34px;
`;

// --------------------------------> estilo al texto
// --------------------------------> ubicacion
// --------------------------------> efecto contador

const TotalAmount = ({ amount }) => {
  return (
    <Contenedor>
      <Valor>
        <Numero>{amount}</Numero>
        <Unidad>eth</Unidad>
      </Valor>
    </Contenedor>
  );
};

export default TotalAmount;
