const {
  successResponse,
} = require("../../../../utils/response");
const { aysncMiddleware } = require("../../../../middlewares/async");
const PriceOracle = require("../../../../models/priceOracle");

const current = aysncMiddleware(async (req, res, next) => {
  const currentPrice = await PriceOracle.findOne()
    .sort({ createdAt: -1 })
    .select("price createdAt");
  return successResponse(res, "Price Oracle current", currentPrice);
});

module.exports = current;
