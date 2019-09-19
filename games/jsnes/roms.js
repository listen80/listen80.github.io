const fs = require('fs')
const dirs = fs.readdirSync('./roms')
const result = fs.writeFileSync('./roms.json', JSON.stringify({roms: dirs}, null, '  '))
console.log('ok')