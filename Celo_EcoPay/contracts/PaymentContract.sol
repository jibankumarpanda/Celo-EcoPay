// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract PaymentContract {
    address public ecoFund;
    event PaymentSent(address indexed from, address indexed to, uint256 amount, uint256 donation);

    constructor(address _ecoFund) {
        require(_ecoFund != address(0), "invalid ecoFund");
        ecoFund = _ecoFund;
    }

    // Receive native CELO payments
    function sendPayment(address receiver) external payable {
        require(msg.value > 0, "zero amount");
        uint256 donation = msg.value / 100; // 1%
        uint256 amountToSend = msg.value - donation;

        (bool sentToReceiver, ) = payable(receiver).call{value: amountToSend}("");
        require(sentToReceiver, "transfer to receiver failed");

        (bool sentToEco, ) = payable(ecoFund).call{value: donation}("");
        require(sentToEco, "donation transfer failed");

        emit PaymentSent(msg.sender, receiver, amountToSend, donation);
    }
}
