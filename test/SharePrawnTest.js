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

        console.log("owner token balance", await sharePrawn.balanceOf(owner.address));

        // // 給合約一億顆 token
        // await sharePrawn.connect(owner).transfer(sharePrawn.address, ethers.utils.parseEther("100000000"));
        
        // // 給合約一千萬顆 eth
        // await owner.sendTransaction({
        //     to: sharePrawn.address,
        //     value: ethers.utils.parseEther("10000000") 
        // })
        // // 先添加流動性
        // await sharePrawn.connect(owner).initLiquidity();
    })

    it("每次 Transfer 會徵收 5% 的稅，即時依照餘額比例分給所有持幣者", async function () {
        // tAmount = 100, rTotal = 800, tTotal = 1000, rate = 0.8
        // tTransferAmount = 95 tFee = 5
        // rAmount = 80, 
        // rTransferAmount = 76, rFee = 4, 

        
        // rTotal = 796, tTotal = 1000

        // 公式：balance = rAmount / (rTotal / tTotal)
        // 假設小明有 200 rToken, 小美有 100 rToken
        // 原本：小明餘額t = 200/ 0.8 = 250, 小美餘額t = 100 / 0.8 = 125
        // 現在：小明餘額t = 200/ 0.796 = 251.256, 小美餘額t = 100 / 0.796 = 125.628
        // 驗算：(手續費t:5) * (小明佔比:200/796) = 1.256; (手續費t:5) * (小美佔比:100/796) = 0.628，證明上述公式正確。

    });

    it("每次在 Uniswap 上賣出會徵收 10% 稅，5% 向 Uniswap 添加流動性，另外 5% 分給鎖倉玩家", async function () {
        
    });

    it("應該被 revert 的行為", async function () {
        
    });

});