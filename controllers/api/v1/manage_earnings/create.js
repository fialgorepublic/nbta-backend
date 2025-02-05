const { successResponse } = require('../../../../utils/response');
const InvestmentReturn = require('../../../../models/investment_return');
const User = require('../../../../models/user');
const Investment = require('../../../../models/investment');
const { aysncMiddleware } = require('../../../../middlewares/async');

const createEarning = aysncMiddleware(async (req, res, next) => {
    const { investor, earning_type, return_percentage, earningFor } = req.body;

    const investors = await getInvestors(earningFor, investor);

    await processInvestorEarnings(investors, earning_type, return_percentage);

    return successResponse(res, 'Earnings created successfully', []);
});

const getInvestors = async (earningFor, investorList) => {
    if (earningFor === 'Accumulate') {
        const investments = await Investment.find({ investor: { $exists: true } });
        const investorIds = [...new Set(investments.map(investment => investment.investor))];
        return User.find({ _id: { $in: investorIds } });
    } else {
        return User.find({ _id: { $in: investorList } });
    }
};

const processInvestorEarnings = async (investors, earning_type, return_percentage) => {
    await Promise.all(
        investors.map(investor => createInvestmentReturn(investor, earning_type, return_percentage))
    );
};

const createInvestmentReturn = async (investor, earning_type, return_percentage) => {
    const earning = new InvestmentReturn({
        investor,
        earning_type,
        return_percentage,
        before_earning: investor.balance
    });

    const investmentPercent = (return_percentage / 100) * investor.balance;
    investor.balance += earning_type === 'profit' ? investmentPercent : -investmentPercent;

    earning.after_earning = investor.balance;

    await investor.save();
    await earning.save();
};

module.exports = createEarning;
