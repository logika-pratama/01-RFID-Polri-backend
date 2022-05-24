const cron = require('node-cron');
const PostData = require('../controller/ITAM/handler/GateOutCek');

cron.schedule('* * * * * *', function() {
  console.log('Running task every 60 second');
  console.log(new Date().toLocaleString())
  PostData.gate();
});

module.exports = cron;