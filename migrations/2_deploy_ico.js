var WeatherToken = artifacts.require("./WeatherToken.sol");
var WeatherCrowdsale = artifacts.require("./WeatherCrowdsale.sol");


const duration = {
  seconds: function (val) { return val; },
  minutes: function (val) { return val * this.seconds(60); },
  hours: function (val) { return val * this.minutes(60); },
  days: function (val) { return val * this.hours(24); },
  weeks: function (val) { return val * this.days(7); },
  years: function (val) { return val * this.days(365); },
};


module.exports = async function(deployer, network, accounts) {
   console.log("network network network > ", network)

  await deployer.deploy(WeatherToken, "Weather Token","WTH", 18);
  const deployedToken = await WeatherToken.deployed();
  const rate = 1000; // 1 eth = 1000 WTH tokens
  const wallet  = accounts[0];
  console.log("wallet wallet wallet > ", wallet)
  const timeNow  = Math.floor(Date.now() / 1000);
  const openingTime =  timeNow + duration.seconds(30);
  const closingTime = timeNow + duration.years(1);
  const cap = web3.toWei(100); //100 eth
  await deployer.deploy(WeatherCrowdsale, rate, wallet, deployedToken.address, openingTime, closingTime, cap);
};

