const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("FundMe", function () {
  let fundMeFactory, fundMe, accounts;
  beforeEach(async () => {
    fundMeFactory = await ethers.getContractFactory("FundMe");
    fundMe = await fundMeFactory.deploy();
    accounts = await ethers.getSigners();
  });

  describe("fund", () => {
    it("fails if the amount is less than 0.1", async () => {
      const funderWithNoMoney = accounts[1];
      const funderWithNoMoneyConnectedContract = await fundMe.connect(
        funderWithNoMoney
      );
      const nickname = "ESTRELLA";
      const sendValue = ethers.utils.parseEther("0.05");

      await expect(
        funderWithNoMoneyConnectedContract.fund(nickname, {
          value: sendValue,
          gasLimit: 1000000,
        })
      ).to.be.revertedWith("FundMe__NotEnoughMoney");
    });
    it("a new funder is added to the registry and the balance is updated", async () => {
      const funder = accounts[2];
      const funderConnectedContract = await fundMe.connect(funder);
      const nickname = "MARCOS";
      const sendValue = ethers.utils.parseEther("0.1");

      const transactionResponse = await funderConnectedContract.fund(nickname, {
        value: sendValue,
        gasLimit: 1000000,
      });
      await transactionResponse.wait();
      const funderData = await funderConnectedContract.getData(funder.address);

      const endingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      );

      assert.equal(funderData.nickname, nickname);
      assert.equal(funderData.money.toString(), sendValue.toString());
      assert.equal(sendValue.toString(), endingFundMeBalance.toString());
    });
    it("an existing funder sends more money", async () => {
      const funder = accounts[2];
      const funderConnectedContract = await fundMe.connect(funder);
      const nickname = "MARCOS";
      const sendValue = ethers.utils.parseEther("0.1");

      const transactionResponse1 = await funderConnectedContract.fund(
        nickname,
        {
          value: sendValue,
          gasLimit: 1000000,
        }
      );
      await transactionResponse1.wait();
      const transactionResponse2 = await funderConnectedContract.fund(
        nickname,
        {
          value: sendValue,
          gasLimit: 1000000,
        }
      );
      await transactionResponse2.wait();
      const funderData = await funderConnectedContract.getData(funder.address);

      const endingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      );
      assert.equal(
        funderData.money.toString(),
        sendValue.add(sendValue).toString()
      );
      assert.equal(
        sendValue.add(sendValue).toString(),
        endingFundMeBalance.toString()
      );
    });
    it("an anonymous funder fails in send less than 0.1 ETH ", async () => {
      const anonymousFunder = accounts[3];
      const contractAdress = fundMe.address;
      const sendValue = ethers.utils.parseEther("0.05");

      await expect(
        anonymousFunder.sendTransaction({
          to: contractAdress,
          value: sendValue,
          gasLimit: 1000000,
        })
      ).to.be.revertedWith("FundMe__NotEnoughMoney");
    });
  });

  it("an anonymous funder sends 0.1 ETH", async () => {
    const anonymousFunder = accounts[3];
    const contractAdress = fundMe.address;
    const sendValue = ethers.utils.parseEther("0.1");

    const transactionResponse = await anonymousFunder.sendTransaction({
      to: contractAdress,
      value: sendValue,
      gasLimit: 1000000,
    });
    await transactionResponse.wait();

    const funderData = await fundMe.getData(anonymousFunder.address);

    const endingFundMeBalance = await fundMe.provider.getBalance(
      fundMe.address
    );
    assert.equal(funderData.nickname, "ANON");
    assert.equal(funderData.money.toString(), sendValue.toString());
    assert.equal(sendValue.toString(), endingFundMeBalance.toString());
  });

  describe("withdraw", () => {
    it("fails if not owner", async () => {
      const notOwner = accounts[2];
      const notOwnerConnectedContract = await fundMe.connect(notOwner);

      await expect(notOwnerConnectedContract.withdraw()).to.be.revertedWith(
        "FundMe__NotOwner"
      );
    });
    before(async () => {
      const contractAdress = fundMe.address;
      const sendValue = ethers.utils.parseEther("0.1");
      for (let index = 1; index < accounts.length; index++) {
        const transactionResponse = await accounts[index].sendTransaction({
          to: contractAdress,
          value: sendValue,
          gasLimit: 1000000,
        });
        await transactionResponse.wait();
      }
    });
    it("funder withdraws the money", async () => {
      const owner = accounts[0];
      const ownerConnectedContract = await fundMe.connect(owner);

      // Balances iniciales
      const startingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      );
      const startingDeployerBalance = await fundMe.provider.getBalance(
        owner.address
      ); // obtenemos el balance del deployer (INICIAL)

      // Withdraw
      const transactionResponse = await ownerConnectedContract.withdraw();
      const transactionReceipt = await transactionResponse.wait(1);

      // Consumo de gas
      const { gasUsed, effectiveGasPrice } = transactionReceipt;
      const gasCost = gasUsed.mul(effectiveGasPrice);

      // Balances finales
      const endingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      );
      const endingDeployerBalance = await fundMe.provider.getBalance(
        owner.address
      );

      assert.equal(endingFundMeBalance, 0); // Sacamos todo el dinero del contrato
      assert.equal(
        startingFundMeBalance.add(startingDeployerBalance).toString(), // usamos add porque son bignumbers
        endingDeployerBalance.add(gasCost).toString() // como el deployer utilizo gas, esta descontado del balance final
      );
    });
  });
  describe("getOwner", () => {
    it("the account who deployed the contract is the owner", async () => {
      const owner = await fundMe.getOwner();
      const deployer = accounts[0];
      assert.equal(owner, deployer.address);
    });
  });
  describe("getNumberOfFunders", () => {
    it("get the number of funders", async () => {
      const contractAdress = fundMe.address;
      const sendValue = ethers.utils.parseEther("0.1");
      for (let index = 0; index < accounts.length; index++) {
        const transactionResponse = await accounts[index].sendTransaction({
          to: contractAdress,
          value: sendValue,
          gasLimit: 1000000,
        });
        await transactionResponse.wait();
      }
      const numberOfFunders = await fundMe.getNumberOfFunders();
      assert.equal(numberOfFunders, accounts.length);
    });
  });
  describe("getFunder", () => {
    beforeEach(async () => {
      const contractAdress = fundMe.address;
      const sendValue = ethers.utils.parseEther("0.1");
      for (let index = 0; index < accounts.length; index++) {
        const transactionResponse = await accounts[index].sendTransaction({
          to: contractAdress,
          value: sendValue,
          gasLimit: 1000000,
        });
        await transactionResponse.wait();
      }
    });

    it("return the funder at position i", async () => {
      const expectedFunderAtPos = accounts[3].address;
      const funderAtPos = await fundMe.getFunder(3);
      assert.equal(expectedFunderAtPos, funderAtPos);
    });
    it("fails if pos out of index", async () => {
      await expect(fundMe.getFunder(accounts.length)).to.be.revertedWith(
        "FundMe__OutOfIndex"
      );
    });
  });
  describe("getData", () => {
    it("fails if the address is not a funder", async () => {
      await expect(fundMe.getData(accounts[2].address)).to.be.revertedWith(
        "FundMe__NotFunder"
      );
    });
  });
});
