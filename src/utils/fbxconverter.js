let converter = require('fbx2gltf')

let convertFBX = async (filePath) => {
  let file = await converter(filePath, filePath + '.glb', ['--khr-materials-unlit'])

  return file
}

module.exports = convertFBX
