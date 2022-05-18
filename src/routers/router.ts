import fs from 'fs'
import path from 'path'
import express from 'express'

function getRouterPaths(dir: string) {
  let results: string[] = []
  const list = fs.readdirSync(dir)
  list.forEach((file) => {
    file = path.join(dir, file)
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(getRouterPaths(file))
    } else if (file.endsWith('.js') || file.endsWith('.ts')) {
      results.push(file.replace(/(.js)|(.ts)/g, ''))
    }
  })
  return results
}

function getRouters(dir: string) {
  const router = express.Router()
  const versionFiles = fs.readdirSync(dir)
  const versions = versionFiles.filter((versionFile) => /^(v\d+)$/.test(versionFile))
  versions.forEach((version) => {
    const routerPaths = getRouterPaths(path.join(dir, version))
    routerPaths.forEach((routerPath) => router.use(`/${version}`, require(routerPath)))
  })
  return router
}

export = getRouters(__dirname)
