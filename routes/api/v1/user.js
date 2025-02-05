const express = require('express')
const { create, ManagekycDoc, fetchById, list, deleteInvestor, update, dashboard, verified, manageProfilePic } = require('../../../controllers/api/v1/users')
const ensureAuth = require('../../../middlewares/ensure-auth')
const app = express.Router()
const upload = require('../../../middlewares/multer')

app.get('/all-investors', list)
app.get('/investors-records', dashboard)
app.get('/verify-investors', verified)
app.get('/:id', fetchById)
app.delete('/:id/delete', deleteInvestor)
app.put('/:id/update', update)
app.put('/upload-picture', ensureAuth, upload.single('profile_picture'), manageProfilePic)
app.post('/register', create)
app.post('/kyc-documents', ensureAuth, upload.fields([
  { name: 'kyc_picture', maxCount: 1 },
  { name: 'kycDocs', maxCount: 6 }
]), ManagekycDoc)
module.exports = app