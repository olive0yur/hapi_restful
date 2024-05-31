const fs = require('fs');
const Path = require('path');

const folders = []
const target = Path.join(__dirname, '..', '/assets')

fs.readdirSync(target).forEach(fileName=>{
    fs.statSync(Path.join(target,fileName)).isDirectory() ? folders.push(fileName) : ""
})

module.exports = folders