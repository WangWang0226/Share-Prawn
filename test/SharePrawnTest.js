const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SharePrawnTest", function () {
    let owner, alice, bob, charlie, david;

    let sharePrawn;
    before(async function () {
        [owner, alice, bob, charlie, david] = await ethers.getSigners();

        const factory = await ethers.getContractFactory("SharePrawn", owner);
        sharePrawn = await factory.deploy();
        await sharePrawn.deployed();

        // owner 有十億 token
        console.log("owner token balance", ethers.utils.formatUnits(await sharePrawn.balanceOf(owner.address), 18));

        // owner 給合約一億顆 token
        const initTokenAmount = ethers.utils.parseEther("100000000");
        await sharePrawn.connect(owner).transfer(sharePrawn.address, initTokenAmount);
        // expect(await sharePrawn.balanceOf(sharePrawn.address)).to.eq(initTokenAmount); //扣掉手續費剩 95477386934673366834170854
        
        // owner 給合約一千萬顆 eth
        const initEtherAmount = ethers.utils.parseEther("1000") 
        await owner.sendTransaction({
            to: sharePrawn.address,
            value: initEtherAmount
        })
        
        expect(await ethers.provider.getBalance(sharePrawn.address)).to.eq(initEtherAmount) 

        console.log("start init liquidity");

        // 先添加流動性
        await sharePrawn.connect(owner).initLiquidity();

        // owner 給 alice 10000 顆 token
        await sharePrawn.connect(owner).transfer(alice.address, ethers.utils.parseEther("10000"));
        console.log("Alice token balance", ethers.utils.formatUnits(await sharePrawn.balanceOf(alice.address), 18));

        // owner 給 bob 20000 顆 token
        await sharePrawn.connect(owner).transfer(bob.address, ethers.utils.parseEther("20000"));
        console.log("Bob token balance", ethers.utils.formatUnits(await sharePrawn.balanceOf(bob.address), 18));

        // owner 給 charlie 30000 顆 token
        await sharePrawn.connect(owner).transfer(charlie.address, ethers.utils.parseEther("30000"));
        console.log("Charlie token balance", ethers.utils.formatUnits(await sharePrawn.balanceOf(charlie.address), 18));

    })

    it("每次 Transfer 會徵收 5% 的稅，即時依照餘額比例分給所有持幣者", async function () {

        let AliceBalance = ethers.utils.formatUnits(await sharePrawn.balanceOf(alice.address), 18);
        let BobBalance = ethers.utils.formatUnits(await sharePrawn.balanceOf(bob.address), 18);
        let charlieBalance = ethers.utils.formatUnits(await sharePrawn.balanceOf(charlie.address), 18);

        // 發起交易
        // owner 給 david 40000 顆 token
        await sharePrawn.connect(owner).transfer(david.address, ethers.utils.parseEther("40000"));
        console.log("David token balance", ethers.utils.formatUnits(await sharePrawn.balanceOf(david.address), 18));

        // 檢查每個地址獲得的分潤量
        let AliceBalanceAfter = ethers.utils.formatUnits(await sharePrawn.balanceOf(alice.address), 18);
        let aliceShare = Math.round((AliceBalanceAfter - AliceBalance)*100000) / 100000
        console.log("Alice got share:", aliceShare); //0.019

        let BobBalanceAfter = ethers.utils.formatUnits(await sharePrawn.balanceOf(bob.address), 18);
        let bobShare = Math.round((BobBalanceAfter - BobBalance)*100000) / 100000
        console.log("Bob got share", bobShare);
        expect(bobShare).to.eq(0.038); // bob 持幣為 Alice 的兩倍，因此分潤也是兩倍

        let charlieBalanceAfter = ethers.utils.formatUnits(await sharePrawn.balanceOf(charlie.address), 18);
        let charlieShare = Math.round((charlieBalanceAfter - charlieBalance)*100000) / 100000
        console.log("Charlie got share", charlieShare);
        expect(charlieShare).to.eq(0.057); // charlie 持幣為 Alice 的三倍，因此分潤也是三倍

        // 沒有開放 r值讓外面取得，所以無法驗證得非常精確，但有驗證到使用者得到的分潤與持有的 token 數成正比

        // 另假設情境：rTotal = 800, tTotal = 1000, rate = 0.8
        // 有人發起交易金額 100 的交易：
        // tAmount = 100, tTransferAmount = 95, tFee = 5
        // rAmount = 80, rTransferAmount = 76, rFee = 4, 
        // 燃燒 rFee 後：
        // rTotal = 796, tTotal = 1000

        // 公式：balance = rAmount / (rTotal / tTotal)
        // 假設小明有 200 rToken, 小美有 100 rToken
        // 原本：小明餘額t = 200/ 0.8 = 250, 小美餘額t = 100 / 0.8 = 125
        // 現在：小明餘額t = 200/ 0.796 = 251.256, 小美餘額t = 100 / 0.796 = 125.628
        // 驗算：(手續費t:5) * (小明佔比:200/796) = 1.256; (手續費t:5) * (小美佔比:100/796) = 0.628，證明合約中的公式正確。

    });

    it("每次在 Uniswap 上賣出會徵收 10% 稅，5% 向 Uniswap 添加流動性，另外 5% 分給鎖倉玩家", async function () {
        
    });

});