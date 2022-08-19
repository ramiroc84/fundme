import React from "react";
import styled from "styled-components";

const Contenedor = styled.div`
  /* width: 200px; */
  height: 100px;
  z-index: 13;
  position: absolute;
  right: 50px;
  bottom: 500px;
  color: white;
  font-weight: 300;
  text-shadow: 2px 2px 7px rgba(0, 0, 0, 0.29);
`;
const FunderElem = styled.div`
  font-size: 25px;
  display: block;
  transition: all 0.1s ease-out;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
    /* cursor: pointer; */
  }
`;

const TopFunderElem = styled.div`
  font-size: 30px;
  display: block;
  transition: all 0.2s ease-out;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
    /* cursor: pointer; */
  }
`;

const Nombre = styled.span``;
const Cantidad = styled.span``;

const arrayPrueba = [
  { name: "ANON", qty: 300 },
  { name: "MARK", qty: 10 },
  { name: "ANON", qty: 5 },
  { name: "JOE", qty: 5 },
  { name: "SARA", qty: 4 },
  { name: "ANON", qty: 3 },
  { name: "ANON", qty: 2 },
  { name: "BRENT", qty: 1 },
];

const TopTenBox = () => {
  return (
    <Contenedor>
      <TopFunderElem>
        <Nombre>{arrayPrueba[0].name.toLowerCase()} </Nombre>
        <Cantidad>{arrayPrueba[0].qty}</Cantidad>
      </TopFunderElem>
      {arrayPrueba.map((elem) => (
        <FunderElem>
          <Nombre>{elem.name.toLowerCase()} </Nombre>
          <Cantidad>{elem.qty}</Cantidad>
        </FunderElem>
      ))}
    </Contenedor>
  );
};

export default TopTenBox;
