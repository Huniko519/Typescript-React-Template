const multer = require('multer')
const fs = require('fs')

const upload = multer({ dest: './uploads' })

//TODO
const item = upload.fields([
  { name: 'albedo', maxCount: 1 },
  { name: 'normal', maxCount: 1 },
  { name: 'emission', maxCount: 1 },
  { name: 'transparency', maxCount: 1 },
  { name: 'previewImg', maxCount: 1 },
])

const model = upload.single('model')
const custom = (fields) => {
  return upload.fields(fields)
}
const text = upload.none()

module.exports = {
  item,
  model,
  custom,
  text,
}
