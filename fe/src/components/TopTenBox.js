import React from "react";
import styled from "styled-components";

const Contenedor = styled.div`
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  justify-content: space-between;
  width: 180px;
  height: 100px;
  z-index: 13;
  position: absolute;
  right: 70px;
  bottom: 500px;
  color: white;
  font-weight: 400;
  text-shadow: 2px 2px 7px rgba(0, 0, 0, 0.5);

  @media (max-width: 900px) {
    /* width: 50%; */
    top: 450px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 70px;
    white-space: nowrap;
    text-align: center;
  }
`;

const Titulo = styled.div`
  font-family: "Gloria Hallelujah", cursive;
  font-size: 35px;
  line-height: 1.2;
  margin-bottom: 7px;
`;

const FunderElem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 23px;
  /* display: block; */
  transition: all 0.2s ease-out;
  &:hover {
    transform: scale(1.3);
    /* box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1); */
    /* cursor: pointer; */
  }
`;

const TopFunderElem = styled.div`
  font-size: 30px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.3);
    /* box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1); */
    /* cursor: pointer; */
  }
`;

const Nombre = styled.span`
  /* margin-right: auto; */
`;
const Cantidad = styled.span`
  /* margin-right: auto; */
`;
const Unidad = styled.span`
  font-size: 10px;
`;

const TopTenBox = ({ fundersArray, symbol }) => {
  return (
    <>
      {fundersArray ? (
        <Contenedor>
          <Titulo>top funders</Titulo>
          <TopFunderElem>
            <Nombre>{fundersArray[0].name.toLowerCase()} </Nombre>
            <Cantidad>
              {fundersArray[0].qty}
              <Unidad> eth</Unidad>
            </Cantidad>
          </TopFunderElem>
          {fundersArray.map((elem) => (
            <FunderElem>
              <Nombre>{elem.name.toLowerCase()} </Nombre>
              <Cantidad>
                {elem.qty}
                <Unidad> eth</Unidad>
              </Cantidad>
            </FunderElem>
          ))}
        </Contenedor>
      ) : (
        <></>
      )}
    </>
  );
};

export default TopTenBox;
