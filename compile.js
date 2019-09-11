const path = require('path');
const fs = require('fs');
const solc = require('solc');

const savingsPath = path.resolve(__dirname, 'contracts', 'savings.sol');
const source = fs.readFileSync(savingsPath, 'utf-8');

module.exports = solc.compile(source, 1).contracts[':Savings'];
