require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

// Router 
const loginRouters = require('./routers/login');
const itemsRouters = require('./routers/Master-Items'); // Master Items
const packingRouters = require('./routers/packing');
const recieveRouters = require('./routers/TransactionRecieve'); // inbound
const grRouters = require('./routers/GoodRecieve'); // Good Recieve
const monitoringRouters = require('./routers/monitoring'); // Monitoring
const orderListRouters = require('./routers/OrderList');
const cashierRouters = require('./routers/QualityControl'); // QC
const giRouters = require('./routers/GoodIssue');
const uploadRouters = require('./routers/upload');
const outboundouters = require('./routers/outbound');
const historyRouters = require('./routers/history');
const bulkUpdateRouters = require('./routers/bulkupdate');
const stockTakeRouters = require('./routers/StockTake');
const readerRouters = require('./routers/reader');
const locationRouters = require('./routers/locations');
const userRouters = require('./routers/user');
const accountRouter = require('./routers/account');
const trxTypeRouter = require('./routers/transactionType');
const publicApiRouter = require('./routers/publicApi');

const app = express();

global.__basedir = __dirname + "/..";
var port = 5000;


// create a Server
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// call router
app.use('/api/v1/login',loginRouters);
app.use('/api/v1/item', itemsRouters);
app.use('/api/v1/pl', packingRouters);
app.use('/api/v1/tr', recieveRouters); 
app.use('/api/v1', grRouters);
app.use('/api/v1/tm', monitoringRouters);
app.use('/api/v1', orderListRouters);
app.use('/api/v1/tc', cashierRouters);
app.use('/api/v1', giRouters);
app.use('/api/v1', uploadRouters);
app.use('/api/v1/td', outboundouters);
app.use('/api/v1', historyRouters);
app.use('/api/v1/bulkupdate', bulkUpdateRouters);
app.use('/api/v1', stockTakeRouters);
app.use('/api/v1', readerRouters);
app.use('/api/v1/locations', locationRouters);
app.use('/api/v1', userRouters);
app.use('/api/v1/account', accountRouter);
app.use('/api/v1', trxTypeRouter);
app.use('/api/v1/public',publicApiRouter);
//var router = require('./router');
//router(app);




app.listen(port, () => {
    console.log(`Server started on port:`, port);
});