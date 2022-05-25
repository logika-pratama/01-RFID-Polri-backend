const cron = require('node-cron');
const PostData = require('../controller/ITAM/handler/GateOutCek');

cron.schedule('* * * * * *', function() {
  console.log('Running task every 1 second');
  console.log(new Date().toLocaleString())
  PostData.gate();
});

module.exports = cron;

// TODO 
// 0 -> Inbound  /tr/log
// 1 -> Good Receive /gr/log
// 2 -> Monitoring/Putway  
// 3 -> Gate Out  /
// 4 -> Good Issue / 

