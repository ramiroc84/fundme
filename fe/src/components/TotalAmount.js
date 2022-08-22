import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const Contenedor = styled.div`
  font-family: "Gloria Hallelujah", cursive;
  text-shadow: 2px 2px 7px rgba(0, 0, 0, 0.5);
  position: absolute;
  right: 200px;
  top: 300px;
  color: white;
`;
const Valor = styled.div``;
const Numero = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 84px;
  letter-spacing: -5px;
`;
const Unidad = styled.span`
  font-family: "Gloria Hallelujah", cursive;
  font-size: 34px;
`;

// --------------------------------> efecto contador !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

const useCountdown = (tick) => {
  // const tick = useRef();
  const [countDown, setCountDown] = useState(0);

  useEffect(() => {
    tick.current = setInterval(() => {
      // <-- set tick ref current value
      setCountDown((prev) => prev + 0.1);
      console.log("countdown", countDown);
    }, 80);
    console.log("countdown", countDown);

    return () => clearInterval(tick.current);

    // const interval = setInterval(() => {
    //   setCountDown((prev) => prev + 0.01);
    // }, 10);

    // return () => clearInterval(interval);
  }, [tick]);
  // if (countDown >= targetValue) {
  //   setCountDown(targetValue);
  //   clearInterval(interval);
  // }
  return countDown.toFixed(2);
};

const TotalAmount = ({ amount }) => {
  // const [count, setCount] = useState(0);
  // const [intervalId, setIntervalId] = useState(0);

  // const newIntervalId = setInterval(() => {
  //   setCount((prevCount) => prevCount + 0.01);
  // }, 100);
  // setIntervalId(newIntervalId);

  // const [amount, setAmount] = useState(amount1);
  // console.log("amount", amount);
  // const [tick, setTick] = useState())
  const tick = useRef();
  let value = 0;
  value = useCountdown(tick);

  if (amount > 0 && value >= amount) {
    // console.log(tick);
    console.log(value, amount);
    clearInterval(tick.current);
    tick.current = 0;
    // value = amount;
  }
  // useEffect(() => {
  //   if (count > amount) {
  //     clearInterval(intervalId);
  //     setIntervalId(0);
  //     return;
  //   }
  // }, []);

  return (
    <Contenedor>
      total funded
      <Valor>
        <Numero>{value}</Numero>
        <Unidad> eth</Unidad>
      </Valor>
    </Contenedor>
  );
};

export default TotalAmount;
