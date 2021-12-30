const { readFileSync, writeFileSync } = require('fs')
const path = require('path')

const typesPath = path.resolve(__dirname, './lib/index.d.ts')

const types = readFileSync(typesPath, { encoding: 'utf-8' }).split('\n').map(l => l.trimEnd())

const removeAllCssImports = typeLine => /^\s*import.*\.(sc|c|sa)ss["'];?$/.test(typeLine) ? "" : typeLine

const fixedTypes = types.map(removeAllCssImports).join('\n')

writeFileSync(typesPath, fixedTypes, { encoding: 'utf-8' })
