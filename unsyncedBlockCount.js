function UnsyncedBlockCount(){
    const divideBy = 3;
    var blockCount = eth.syncing.highestBlock - eth.syncing.currentBlock;
    var blockCountStringified = blockCount.toString();
    var result = [];
    while(blockCountStringified.length)
    {
        result.push(blockCountStringified.slice(-3));
        blockCountStringified = blockCountStringified.slice(0, -3);
    }
    return result.reverse().join(".");
}