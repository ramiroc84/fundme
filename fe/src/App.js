import { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { ethers } from "ethers";

import ConnectBox from "./components/ConnectBox";
import Hero from "./components/Hero";
import TopTenBox from "./components/TopTenBox";
import TransferBox from "./components/TransferBox";

import { abi, contractAddress } from "./constants";

const GlobalStyle = createGlobalStyle`
html{
  overflow:hidden;
}
  body {
    /* background-color: aquamarine; */
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
  /* background-color: orange; */
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

function App() {
  const [connected, setConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [chainName, setChainName] = useState("");

  // const connect = () => {
  //   setConnected((prev) => !prev);
  // };

  const onClickConnect = () => {
    if (!window.ethereum) {
      console.log("please install MetaMask");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0]);
        // if (currentAccount === ownerAddress) {
        //   setOwner(true);
        // }
      })
      .catch((e) => console.log(e));
  };

  const onClickDisconnect = () => {
    setConnected(false);
    // setChainId(null);
    setChainName("");
    setCurrentAccount(undefined);
    setIsOwner(false);
    // setOwnerAddress("");
    // setInput("");
  };

  useEffect(() => {
    setConnected(false);
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return;

    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    provider.getNetwork().then((result) => {
      // setChainId(result.chainId);
      setChainName(result.name);
      setConnected(true);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);
      contract.getOwner().then((own) => {
        // setOwnerAddress(own);
        if (currentAccount.toLowerCase() === own.toLowerCase()) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
      });
      // contract.getPalabra().then((palabra) => {
      //   setPalabra(palabra);
      // });
    });
  }, [currentAccount]);

  useEffect(() => {
    if (!window.ethereum) return;

    const accountWasChanged = (accounts) => {
      setCurrentAccount(accounts[0]);
    };

    const clearAccount = () => {
      onClickDisconnect();
      console.log("clearAccount");
    };
    window.ethereum.on("accountsChanged", accountWasChanged);
    // window.ethereum.on("connect", getAndSetAccount);
    window.ethereum.on("disconnect", clearAccount);

    return () => {
      window.ethereum.removeListener("accountsChanged", accountWasChanged);
      window.ethereum.removeListener("disconnect", clearAccount);
    };
  }, []);

  return (
    <>
      <GlobalStyle />

      <Seccion>
        <ConnectBox
          connected={connected}
          address={currentAccount}
          manageConnect={onClickConnect}
          manageDisonnect={onClickDisconnect}
        ></ConnectBox>
        <Hero chainName={chainName}></Hero>
        {/* <ContenedorImagenes>
          <Imagen></Imagen>
          <Imagen></Imagen>
          <Imagen></Imagen>
          <Imagen></Imagen>
        </ContenedorImagenes> */}
        <TopTenBox fundersArray={arrayPrueba}></TopTenBox>
        <TransferBox connected={connected} owner={true}></TransferBox>
      </Seccion>
      {/* <Seccion></Seccion> */}
    </>
  );
}

export default App;
