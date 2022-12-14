# Share Prawn

## 簡介
### SharePrawn 是一個分潤型代幣
- 每次 Transfer 會徵收 5% 的稅，“即時” 依照餘額比例分給所有持幣者
- 每次在 Uniswap 上賣出會徵收 10% 的稅，其中 5% 會用來向 Uniswap 上的池子添加流動性，另外 5% 會分給代幣鎖倉玩家
- 用戶可以鎖倉代幣，一次鎖越久分潤比例越高

### 鎖倉制度
- 使用者可以自行決定鎖多久，以天為單位。
  ```solidity
    function stacking(uint n) public {
      _stackingAccounts.push(_msgSender());
      _stackingPeriodOf[_msgSender()] = n;
      _isStackingAccount[_msgSender()] = true;
      totalStackingSum = totalStackingSum + n;
      _stackingUnlockTimeOf[_msgSender()] = block.timestamp + n * 24 * 60 * 60;
    }
  ```
- 到期之前不能賣出或轉帳。
- 鎖倉期間，只要有人賣出代幣，就可以依照鎖倉時長獲得對應分潤

## 測試項目

- 每次 Transfer 會徵收 5% 的稅，“即時” 依照餘額比例分給所有持幣者
    - 每次 transfer 發生後，檢查持幣者們的餘額是否依比例收到分潤
- 每次在 Uniswap 上賣出會徵收 10% 的稅，其中 5% 會用來向 Uniswap 上的池子添加流動性，另外 5% 會分給代幣鎖倉的人
    - 檢查每次在 Uniswap 賣出後，合約有沒有收集到該交易額的 5% ，之後要用於添加流動性。
    - 檢查每次在 Uniswap 賣出後，鎖倉玩家獲得的分潤，是不是與他們鎖倉時長成正比。
- 檢查鎖倉是否無法轉帳，以及過了鎖倉期限後，是否能順利轉帳。
