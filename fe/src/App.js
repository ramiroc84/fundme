import { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { ethers } from "ethers";

import ConnectBox from "./components/ConnectBox";
import Hero from "./components/Hero";
import TopTenBox from "./components/TopTenBox";
import TransferBox from "./components/TransferBox";
import TotalAmount from "./components/TotalAmount";

import { abi, contractAddress, chainId } from "./constants";

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
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  // const [input, setInput] = useState("");

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
        // console.log(accounts);
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
      // console.log(result.chainId);
      if (result.chainId !== chainId) {
        alert("Please choose the right network");
        setCurrentAccount("");
        return;
      }
      setChainName(result.name);
      setConnected(true);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);
      // console.log(contract);
      contract
        .getOwner()
        .then((own) => {
          // setOwnerAddress(own);
          if (currentAccount.toLowerCase() === own.toLowerCase()) {
            setIsOwner(true);
          } else {
            setIsOwner(false);
          }
        })
        .catch((err) => alert(err));
      contract.getTotalAmount().then((totalAmount) => {
        setTotalAmount(ethers.utils.formatEther(totalAmount));
      });

      // contract
      //   .getNumberOfFunders()
      //   .then((number) => console.log("number of funders", number));

      // let funder0;
      // contract.getFunder(1).then((funder) => {
      //   console.log("funder0", funder);
      //   contract.getData(funder).then((data) => console.log("funder0", data));
      // });
      // contract.getFunder(1).then((funder) => console.log("funder1", funder));
      // console.log("fffffffunder0", funder0);
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
    window.ethereum.on("disconnect", clearAccount);

    return () => {
      window.ethereum.removeListener("accountsChanged", accountWasChanged);
      window.ethereum.removeListener("disconnect", clearAccount);
    };
  }, []);

  async function onClickWithdraw() {
    console.log("withdraw");
  }

  async function onClickFund(name, value) {
    // e.preventDefault();
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner(); // obtenemos la wallet conectada
      const contract = new ethers.Contract(contractAddress, abi, signer);
      console.log(name, value);
      try {
        let transactionResponse;
        setLoading(true);
        transactionResponse = await contract.fund(name, {
          value: ethers.utils.parseEther(value),
        });
        // if (isOwner) {
        //   transactionResponse = await contract.setPalabra(input);
        //   // await listenForTransactionMine(transactionResponse, provider);
        //   // const NuevaPalabra = await contract.getPalabra();

        //   // setPalabra(NuevaPalabra);
        //   // setInput("");
        // } else {
        //   transactionResponse = await contract.setPalabra(input, {
        //     value: ethers.utils.parseEther("0.1"),
        //   });
        // }
        await listenForTransactionMine(transactionResponse, provider);

        const newAmount = await contract.getTotalAmount();
        //const fundersNumber = await contract.getNumberOfFunders();
        //console.log(fundersNumber);
        //const funder_0 = await contract.getFunder(0);
        //const funder_1 = await contract.getFunder(1);
        //console.log(funder_0);
        //console.log(funder_1);

        setTotalAmount(ethers.utils.formatEther(newAmount));
        // setInput("");
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
        // setInput("");
      }

      // console.log(signer); // conecta al nodo de metamask
    }
  }
  function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Minando ${transactionResponse.hash} ...`);
    return new Promise((resolve, reject) => {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(
          `Completed with ${transactionReceipt.confirmations} confirmations`
        );
        resolve();
      });
    });
  }

  return (
    <>
      <GlobalStyle />

      <Seccion>
        <ConnectBox
          connected={connected}
          address={currentAccount}
          handleConnect={onClickConnect}
          handleDisonnect={onClickDisconnect}
        />
        <Hero chainName={chainName} />
        {connected && <TotalAmount amount={totalAmount} />}
        {/* // --------------------------------> pasar array verdadero */}
        {connected && <TopTenBox fundersArray={arrayPrueba} />}
        {connected && (
          <TransferBox
            owner={isOwner}
            handleFund={onClickFund}
            handleWithdraw={onClickWithdraw}
          />
        )}
      </Seccion>
    </>
  );
}

export default App;
