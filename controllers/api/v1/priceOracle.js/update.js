const { successResponse } = require("../../../../utils/response");
const { aysncMiddleware } = require("../../../../middlewares/async");
const PriceOracle = require("../../../../models/priceOracle");

const update = aysncMiddleware(async (req, res, next) => {
  const { price } = req.body;
  if (!price || isNaN(price)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid price value" });
  }

  console.log("CURRRENT: " + JSON.stringify(req.currentUser, null, 4));

  const newPriceRecord = new PriceOracle({
    price,
    updatedBy: req.currentUser._id, // Assuming your auth middleware adds user to req
  });

  await newPriceRecord.save();

  return successResponse(res, "New Price record added", newPriceRecord);
});

module.exports = update;
