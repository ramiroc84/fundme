//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

error FundMe__NotOwner();
error FundMe__NotEnoughMoney();
error FundMe__OutOfIndex();
error FundMe__NotFunder();

contract FundMe {
    // hacer una lista de los funders. (direccion, apodo, cuanto dono acumulado, cuanto dono actualmente)
    // permitir hacer un withdraw al dueno del contrato

    struct Datos {
        string nickname;
        uint256 money;
        uint256 money_total; // para llevar ranking de quien dono mas
        bool exist;
    }

    uint256 private constant MINIMUM_ETH = 0.1 * 1e18;
    address private immutable i_owner;
    uint256 private s_amount;
    uint256 private s_total_amount;
    address[] private s_funders;
    mapping(address => Datos) private s_funders_registry;

    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert FundMe__NotOwner();
        }
        _;
    }

    modifier requiredAmount() {
        if (msg.value < MINIMUM_ETH) {
            revert FundMe__NotEnoughMoney();
        }
        _;
    }

    constructor() {
        i_owner = msg.sender;
        s_amount = 0;
        s_total_amount = 0;
    }

    receive() external payable {
        fund("ANON");
    }

    fallback() external payable {
        fund("ANON");
    }

    function fund(string memory nickname) public payable requiredAmount {
        if (!s_funders_registry[msg.sender].exist) {
            s_funders.push(msg.sender);
            s_funders_registry[msg.sender] = Datos(
                nickname,
                msg.value,
                msg.value,
                true
            );
        } else {
            Datos memory aux = s_funders_registry[msg.sender];
            aux.money += msg.value;
            aux.money_total += msg.value;
            s_funders_registry[msg.sender] = aux;
        }
        s_amount += msg.value;
        s_total_amount += msg.value;
    }

    function withdraw() public payable onlyOwner {
        address[] memory funders = s_funders;
        for (uint256 i = 0; i < funders.length; i++) {
            address direccion = funders[i];
            Datos memory aux = s_funders_registry[direccion];
            if (aux.money > 0) {
                aux.money = 0;
                s_funders_registry[direccion] = aux;
            }
        }
        s_amount = 0;
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Envio Fallido");
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getNumberOfFunders() public view returns (uint256) {
        return s_funders.length;
    }

    function getFunder(uint256 index) public view returns (address) {
        if (index >= s_funders.length) {
            revert FundMe__OutOfIndex();
        }
        return s_funders[index];
    }

    function getData(address funder) public view returns (Datos memory) {
        if (!s_funders_registry[funder].exist) {
            revert FundMe__NotFunder();
        }
        return s_funders_registry[funder];
    }

    function getAmount() public view returns (uint256) {
        return s_amount;
    }

    function getTotalAmount() public view returns (uint256) {
        return s_total_amount;
    }
}
