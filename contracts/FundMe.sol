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

    // cantidad minima a donar
    uint256 private constant MINIMUM_ETH = 0.1 * 1e18;
    // direccion del dueno del contrato
    address private immutable i_owner;
    // acumulado hasta que se reclame
    uint256 private s_amount;
    // acumulado durante toda la vida del contrato (historico)
    uint256 private s_total_amount;
    // lista de direcciones de funders
    address[] private s_funders;
    // registro de funders
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
    // Si se recibe una donacion por fuera de la pag (tx a dir del contrato), se ejecuta la funcion fund y el funder es anonimo
    receive() external payable {
        fund("ANON");
    }

    fallback() external payable {
        fund("ANON");
    }
    /* -------------------------------------------------------------------------- */

    function fund(string memory nickname) public payable requiredAmount {
        // si la direccion del funder no existe, lo cargo
        if (!s_funders_registry[msg.sender].exist) {
            s_funders.push(msg.sender);
            s_funders_registry[msg.sender] = Datos(
                nickname,
                msg.value,
                msg.value,
                true
            );
            // si existe
        } else {
            // obtengo sus datos del registro
            Datos memory aux = s_funders_registry[msg.sender];
            // donacion actual (hasta reclamo)
            aux.money += msg.value;
            // donacion total hecha (historica)
            aux.money_total += msg.value;
            // actualizo el registro
            s_funders_registry[msg.sender] = aux;
        }
        s_amount += msg.value;
        s_total_amount += msg.value;
    }

    function withdraw() public payable onlyOwner {
        // descargo a la memoria el listado de las direcciones de los funders
        address[] memory funders = s_funders;

        for (uint256 i = 0; i < funders.length; i++) {
            address direccion = funders[i];
            // por cada funder obtengo sus datos del registro
            Datos memory aux = s_funders_registry[direccion];
            // si hizo una ultima donacion la reseteo
            if (aux.money > 0) {
                aux.money = 0;
                // guardo el registro actualizado
                s_funders_registry[direccion] = aux;
            }
        }
        // reseteo el contador actual, no el historico
        s_amount = 0;
        // envio el dinero al owner (solo el owner puede entrar en el metodo withdraw)
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
