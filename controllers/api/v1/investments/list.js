const { successResponse } = require("../../../../utils/response");
const Investment = require("../../../../models/investment");
const { aysncMiddleware } = require("../../../../middlewares/async");

const allInvestments = aysncMiddleware(async (req, res, next) => {
  const investments = await Investment.find().populate(
    "investor",
    "first_name last_name"
  );

  const formattedInvestments = investments.map((investment) => ({
    ...investment._doc,
    investor: `${investment?.investor?.first_name} ${investment.investor?.last_name}`,
    createdAt: investment?.createdAt?.toLocaleDateString("en-CA"),
  }));
  return successResponse(res, "All Investments", formattedInvestments);
});

module.exports = allInvestments;
