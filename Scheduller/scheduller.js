const cron = require('node-cron');
const PostData = require('../controller/ITAM/handler/GateOutCek');

cron.schedule('*/10 * * * * *', function() {
  console.log('Running task every 10 second');
  console.log(new Date().toLocaleString())
  PostData.gate();
});

module.exports = cron;