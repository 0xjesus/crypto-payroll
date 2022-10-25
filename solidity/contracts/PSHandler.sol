//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./PSplitter.sol";
contract PSHandler is Initializable, OwnableUpgradeable{

    using Counters for Counters.Counter;

    struct User {
        Counters.Counter _total;
        mapping(uint => address) _payment_splitters;
    }

    mapping(address => User) public _payment_splitters_registry;
    mapping(uint => address) public _splitter_to_address;
    Counters.Counter public _splitters_counter;
    
    event PaymentSplitterCloned(address, address);

    function initialize() public initializer{
        __Ownable_init();
    }

    function createSplitter(address[] memory payees, uint256[] memory shares) external{
        PSplitter newSplitter = new PSplitter();
        newSplitter.initialize(payees, shares);
        _splitters_counter.increment();
        User storage new_user = _payment_splitters_registry[msg.sender];
        new_user._total.increment();
        new_user._payment_splitters[new_user._total.current()] = address(newSplitter);
        _splitter_to_address[_splitters_counter.current()] = msg.sender;
        newSplitter.transferOwnership(msg.sender);
    }

    function getSplitter(uint id) public view returns (address){
        return _payment_splitters_registry[msg.sender]._payment_splitters[id];
    }
}