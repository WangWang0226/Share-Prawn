# Share Prawn

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

SharePrawn 是一個分潤型代幣
- 每次 Transfer 會徵收 5% 的稅，“即時” 依照餘額比例分給所有持幣者
- 每次在 Uniswap 上賣出會徵收 10% 的稅，其中 5% 會用來向 Uniswap 上的池子添加流動性，另外 5% 會分給代幣鎖倉玩家
- 用戶可以鎖倉代幣，一次鎖越久分潤比例越高
