# Share Prawn

## Introduction
Share Prawn is a profit-sharing token inspired by the Safemoon implementation. Users can lock their tokens, and the longer they lock them, the higher their profit-sharing ratio. Each transfer incurs a 5% tax, which is immediately distributed to all token holders based on their balance through a burn mechanism. Selling tokens on Uniswap incurs a 10% tax, with 5% allocated to adding liquidity to the Uniswap liquidity pool and the remaining 5% distributed to users who have locked their tokens.

### Staking System
- Users can decide how long to stake, in units of days.
  ```solidity
    function stacking(uint n) public {
      _stackingAccounts.push(_msgSender());
      _stackingPeriodOf[_msgSender()] = n;
      _isStackingAccount[_msgSender()] = true;
      totalStackingSum = totalStackingSum + n;
      _stackingUnlockTimeOf[_msgSender()] = block.timestamp + n * 24 * 60 * 60;
    }
  ```
- Tokens cannot be sold or transferred before the staking period expires.
- During the staking period, whenever someone sells tokens, stakers receive corresponding profit-sharing based on their staking duration.

## Test Cases

- A 5% tax is levied on each transfer, which is "immediately" distributed to all token holders based on their balance.
    - After each transfer, check if the token holders' balances have received profit-sharing proportionately.
- A 10% tax is levied on each sale on Uniswap, with 5% used to add liquidity to the Uniswap pool and the other 5% distributed to token stakers.
    - Check if the contract collects 5% of the transaction amount after each sale on Uniswap for adding liquidity.
    - Check if the profit-sharing received by stakers after each sale on Uniswap is proportional to their staking duration.
- Check if staking prevents transfers and if transfers can be made smoothly after the staking period expires.

## Technical Details
This contract is designed to efficiently distribute token rewards through a reflection mechanism. It incorporates various features such as automatic tax collection on transactions, liquidity addition, and staking rewards.

The reflection mechanism works by collecting a tax on each transaction and deducting this tax from the total reflection amount. This tax is then automatically distributed to all token holders based on their proportional holdings. Instead of updating each holder's reflection amount individually, the total reflection amount is adjusted, ensuring that each holder receives their fair share of the rewards based on their proportion of ownership, thereby improving efficiency and reducing gas fees.
