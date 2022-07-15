const cron = require('node-cron');
const PostData = require('../controller/ITAM/handler/GateCek');

cron.schedule('* * * * * *', function() {
  //console.log('Running task every 1 second');
  //console.log(new Date().toLocaleString())
  PostData.gate();
});

module.exports = cron;

