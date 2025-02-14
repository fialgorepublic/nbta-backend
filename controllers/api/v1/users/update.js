const {successResponse, errorResponse} = require('../../../../utils/response')
const User = require('../../../../models/user')
const {aysncMiddleware} = require('../../../../middlewares/async')

const update = aysncMiddleware( async (req, res, next) => {
    const { id } = req.params
    const { first_name, last_name, email, password, public_wallet_address, kyc_status } = req.body
    const user = await User.findOne({_id: id})
    
    if (user) {
        user.first_name = first_name || user.first_name
        user.last_name = last_name || user.last_name
        user.email = email || user.email
        user.password =  password || user.password
        user.public_wallet_address = public_wallet_address || user.public_wallet_address
        user.kyc_status = kyc_status || user.kyc_status
        await user.save()
        return successResponse(res, 'Investor update successfully', user)
    } else {
        return errorResponse(res, 'User Not Found')
    }
})

module.exports = update