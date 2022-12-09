pragma solidity ^0.8.17;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { IUniswapV2Factory, IUniswapV2Pair, IUniswapV2Router01, IUniswapV2Router02 } from "./Interface.sol";

contract SimpleSafemoon is IERC20, Ownable {
    using Address for address;
    using SafeERC20 for IERC20;
}