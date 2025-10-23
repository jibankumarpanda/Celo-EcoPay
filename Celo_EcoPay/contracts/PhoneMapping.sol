// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract PhoneMapping {
    mapping(bytes32 => address) public phoneToWallet;
    event PhoneRegistered(bytes32 indexed phoneHash, address indexed owner);

    function registerPhone(bytes32 phoneHash) external {
        require(phoneHash != bytes32(0), "invalid hash");
        phoneToWallet[phoneHash] = msg.sender;
        emit PhoneRegistered(phoneHash, msg.sender);
    }

    function getWallet(bytes32 phoneHash) public view returns (address) {
        return phoneToWallet[phoneHash];
    }
}
