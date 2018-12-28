pragma solidity ^0.5.0;

contract Peg {
    address relayer;

    mapping (address => uint256) private balances;

    function getBalance(address user)
        public view returns (uint256)
    {
        return balances[user];
    }

    modifier onlyRelayer() {
        require(msg.sender == relayer);
        _;
    }

    constructor(address relayerAddress)
        public
    {
        relayer = relayerAddress;
    }

    function()
        external payable
    {
        deposit(msg.sender, msg.value);
    }

    function deposit(address user, uint256 amount)
        internal
    {
        balances[user] += amount;

        emit Deposit(user, amount);
    }

    function release(address payable user, uint256 amount)
        external onlyRelayer
    {
        require(getBalance(user) >= amount);

        balances[user] -= amount;

        user.transfer(amount);

        emit Release(user, amount);
    }

    event Deposit(address indexed user, uint256 amount);
    event Release(address indexed user, uint256 amount);
}
