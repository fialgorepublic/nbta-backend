const {
  successResponse,
  errorResponse,
} = require("../../../../utils/response");
const { aysncMiddleware } = require("../../../../middlewares/async");

const uploadProfilePic = aysncMiddleware(async (req, res, next) => {
  const { currentUser: user, file: profile_picture } = req;

  if (!profile_picture) {
    return errorResponse(res, "Please upload at least one document");
  }
  user.profile_picture = profile_picture.path;
  await user.save();
  return successResponse(res, "Profile Picture updated", user);
});

module.exports = uploadProfilePic;
