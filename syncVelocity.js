const path = require("path");
const cp = require("child_process");
const fs = require("fs");
const net = require('net');

const Web3 = require("web3");

var web3 = new Web3(new Web3.providers.IpcProvider("\\\\.\\pipe\\geth.ipc", net));

// Web3.setProvider(new Web3.providers.IpcProvider(`ipc:\\\\.\\pipe\\geth.ipc`, net));
web3.eth.getCoinbase((err, v)=>console.log(v));

var unsyncedBlockCount = fs.readFileSync("./unsyncedBlockCount.js");
var selfExecuteCode = `'(${unsyncedBlockCount.toString()})();'`;
selfExecuteCode = `'eth.syncing.currentBlock'`;

const processGethPath = process.argv
    .slice(2)
    .map(a=>a.trim())
    .find(a=>a.slice(0,12)==="--geth-path=");

const gethPath = process["GETH_PATH"] || processGethPath ? processGethPath.slice(12) : ".";

const processInterval = process.argv
    .slice(2)
    .map(a=>a.trim())
    .find(a=>a.slice(0,11)==="--interval=");

const interval = process["INTERVAL"] || processInterval ? processInterval.slice(11) : 1000;

console.log("==============WELCOME==============");


// global.setInterval(RecalculateAndPrintVelocity, interval);

const gethFullPath = path.join(gethPath, "geth");

function RecalculateAndPrintVelocity(){
    var args = [gethFullPath, "--exec", selfExecuteCode, `attach ipc:\\\\.\\pipe\\geth.ipc`];
    console.log(args.join(" "));
    var stdout = cp.execSync(args.join(" "));
    console.log(stdout.toString());
    var blockCount = Number.parseInt(stdout.toString());
    console.log(blockCount);
}
