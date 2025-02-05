const successResponse = (res, message, data = null, status = 200) => {
  response = { success: true, message: message }
  if (data != null) {
    response['data'] = data
  }
  res.status(200).send(response)
}

const errorResponse = (res, message, status=400) => {
  return res.status(status).send({success: false, message: message})
}

module.exports = {
  successResponse, errorResponse
}