const {successResponse} = require('../../../../utils/response')
const User = require('../../../../models/user')
const Investment = require('../../../../models/investment')
const moment = require('moment');
const {aysncMiddleware} = require('../../../../middlewares/async')

const dashboard = aysncMiddleware(async (req, res, next) => {
  const thirtyDaysAgo = moment().subtract(30, 'days').startOf('day').toDate();
  const today = moment().endOf('day').toDate();

  const usersByDay = await User.aggregate([
    {
      $match: { createdAt: { $gte: thirtyDaysAgo, $lte: today }, role: 'investor' }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 } 
    }
  ]);
  const investmentsByDay = await Investment.aggregate([
    {
      $match: { createdAt: { $gte: thirtyDaysAgo, $lte: today } }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        totalAmount: { $sum: '$amount' } 
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);
    
  const fillMissingDates = (dataArray, field, days = 30) => {
    const filledData = [];
    let currentDate = moment().subtract(days - 1, 'days').startOf('day');

    for (let i = 0; i < days; i++) {
      const dateStr = currentDate.format('YYYY-MM-DD');
      const dataForDate = dataArray.find(item => item._id === dateStr);
      filledData.push(dataForDate ? dataForDate[field] : 0);
      currentDate = currentDate.add(1, 'day');
    }

    return filledData;
  };
    
  const usersData = fillMissingDates(usersByDay, 'count');
  const investmentsData = fillMissingDates(investmentsByDay, 'totalAmount');

  const data = [
    {
      title: 'Investors',
      value: usersByDay.reduce((acc, day) => acc + day.count, 0).toString(),
      interval: 'Last 30 days',
      trend: 'up',
      data: usersData,
    },
    {
      title: 'Investment',
      value: investmentsByDay.reduce((acc, day) => acc + day.totalAmount, 0).toString(),
      interval: 'Last 30 days',
      trend: 'down',
      data: investmentsData,
    },
  ];
  return successResponse(res, 'Investor data', data)
})

module.exports = dashboard