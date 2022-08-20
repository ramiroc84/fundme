import React from "react";
import styled from "styled-components";

import hero from "../imgs/street_3.jpg";

const Contenedor = styled.div`
  width: 100%;
  /* padding-top: 100px; */
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: red; */
  position: relative;
`;

const HeroImage = styled.div`
  width: 100%;
  /* display: block; */
  height: 100vh;
  background-image: url(${hero});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  filter: grayscale() blur(0.1px);
`;

const PieImagen = styled.div`
  color: white;
  font-weight: 700;
  font-size: 13px;
  position: absolute;
  right: 130px;
  bottom: 50px;
`;

const Titulo = styled.div`
  font-weight: 900;
  font-size: 240px;
  position: absolute;
  left: 200px;
  top: 200px;
  z-index: 10;
  color: white;
  text-shadow: 2px 2px 7px rgba(0, 0, 0, 0.29);

  @media (max-width: 900px) {
    /* width: 50%; */
    top: 250px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 70px;
    white-space: nowrap;
    text-align: center;
  }
`;

const Subtitulo = styled.div`
  font-weight: 300;
  font-size: 30px;
  position: absolute;
  left: 213px;
  top: 190px;
  z-index: 10;
  color: white;
  text-shadow: 2px 2px 7px rgba(0, 0, 0, 0.29);
  @media (max-width: 900px) {
    /* width: 50%; */
    top: 190px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 19px;
    text-align: center;
    /* white-space: nowrap; */
  }
`;

const Hero = ({ chainName }) => {
  return (
    <>
      <Contenedor>
        <Subtitulo>
          all donations will go towards shelter and food for stray dogs
        </Subtitulo>
        <Titulo>
          help us <br />
          help them
        </Titulo>
        <HeroImage>
          <PieImagen>connected to {chainName}</PieImagen>
        </HeroImage>
      </Contenedor>
    </>
  );
};

export default Hero;
