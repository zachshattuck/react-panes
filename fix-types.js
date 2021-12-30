const { readFileSync, writeFileSync, readdirSync } = require('fs')
const path = require('path')

/**
 * 
 * @param {string} path 
 * @returns {{ item: import('fs').Dirent, pathSoFar: string }[]}
 */
const getItemsInDir = path => readdirSync(path, { withFileTypes: true, encoding: 'utf-8' }).map(item => ({ pathSoFar: path, item }))

/**
 * 
 * @param {string[]} acc 
 * @param {{ pathSoFar: string, item: import('fs').Dirent}} p1 
 */
const getTypePathsReducer = (acc, { pathSoFar, item }) => {
  const itemPath = path.resolve(pathSoFar, `./${item.name}`)
  if (item.isFile() && /\.d\.tsx?$/.test(item.name)) return [...acc, itemPath]
  if (item.isDirectory()) {
    const items = getItemsInDir(itemPath)
    return [...acc, ...items.reduce(getTypePathsReducer, [])]
  }

  return acc
}

const initialPath = path.resolve(__dirname, './lib')
const typePaths = getItemsInDir(initialPath).reduce(getTypePathsReducer, [])

typePaths.forEach(typesPath => {
  const types = readFileSync(typesPath, { encoding: 'utf-8' }).split('\n').map(l => l.trimEnd())

  const removeAllCssImports = typeLine => /^\s*import.*\.(sc|c|sa)ss["'];?$/.test(typeLine) ? "" : typeLine

  const fixedTypes = types.map(removeAllCssImports).join('\n')

  writeFileSync(typesPath, fixedTypes, { encoding: 'utf-8' })
})
