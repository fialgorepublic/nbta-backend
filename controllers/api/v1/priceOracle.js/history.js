const { successResponse } = require("../../../../utils/response");
const { aysncMiddleware } = require("../../../../middlewares/async");
const PriceOracle = require("../../../../models/priceOracle");

const history = aysncMiddleware(async (req, res, next) => {
  const oracleHistory = await PriceOracle.find()
    .sort({ createdAt: -1 })
    .populate("updatedBy", "first_name last_name")
    .limit(100); // Limit to last 100 records

  return successResponse(res, "Price Oracle history", oracleHistory);
});

module.exports = history;
