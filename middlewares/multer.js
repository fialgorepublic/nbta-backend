const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './storage')
  },
  filename: function(req, file, cb) {
    const uniqueName = Math.random().toString(36).slice(2);
    cb(null, uniqueName + path.extname(file.originalname))
  }
})

const upload = multer({
  storage
})

module.exports = upload