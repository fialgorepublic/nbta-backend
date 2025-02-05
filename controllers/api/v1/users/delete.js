const User = require('../../../../models/user')
const {successResponse, errorResponse} = require('../../../../utils/response')
const {aysncMiddleware} = require('../../../../middlewares/async')

const deleteInvestor = aysncMiddleware( async(req, res, next) => {
    const { id } = req.params
    const deleteUser = await User.findByIdAndDelete(id)

    if (deleteUser){
        return successResponse(res, 'User deleted successfully', deleteUser)
    } else {
        return errorResponse(res, 'User Not found')
    }
})

module.exports = deleteInvestor