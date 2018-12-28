# ETH <=> EOS token

## [Peg](contracts/Peg.sol)
`solc version 0.5.0+commit.1d4f565a.Emscripten.clang`

 ##### constructor 
  nonpayable 


 Type | Name |
--- | --- |
| address | relayerAddress |
___
 ##### fallback 
  payable payable


___
 ##### event Deposit
   


 Type | Name |
--- | --- |
| address | user |
| uint256 | amount |
___
 ##### event Release
   


 Type | Name |
--- | --- |
| address | user |
| uint256 | amount |
___
 ##### function getBalance
 constant view 


 Type | Name |
--- | --- |
| address | user |
___
 ##### function release
  nonpayable 


 Type | Name |
--- | --- |
| address | user |
| uint256 | amount |
___

---
