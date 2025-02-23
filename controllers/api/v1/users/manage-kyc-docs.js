const { successResponse, errorResponse } = require("../../../../utils/response");
// const { asyncMiddleware } = require('../../../../middlewares/async');
const {aysncMiddleware} = require('../../../../middlewares/async')

const ManageKycDoc = aysncMiddleware(async (req, res) => {
  const { currentUser: user, files: pictures } = req;
  if (!user) return errorResponse(res, 'User not found');

  if (!pictures || pictures.length === 0) {
    return errorResponse(res, 'Please upload at least one document');
  }
  
  if (pictures['kyc_picture']) {
    let kyc_pic_path = pictures['kyc_picture'][0]?.path
    user.kyc_picture = kyc_pic_path;
  }
  if (pictures['kycDocs']) {
    pictures['kycDocs'].forEach(file => {
      const { originalname, path } = file;
        user.kyc_status = 'InProgress';
        addDocumentIfNotExists(user, originalname, path);
    });
  }

  await user.save();
  user.kyc_docs =  user.kyc_docs.at(- 1)
  return successResponse(res, 'Kyc documents uploaded', user);
});

function addDocumentIfNotExists(user, name, url) {
  const documentExists = user.kyc_docs.some(doc => doc.name === name);
  if (!documentExists) {
    user.kyc_docs.push({ name, url });
  }
}

module.exports = ManageKycDoc;