//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./PaymentSplitterUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract PSplitter is Initializable, PaymentSplitterUpgradeable{

    function initialize(address[] memory payees, uint256[] memory shares) public initializer {
        __Ownable_init();
        __PaymentSplitter_init(payees, shares);
    }

    function newSplit(address[] memory payees, uint256[] memory shares) public onlyOwner{
        __PaymentSplitter_init(payees, shares);
    }


}