require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const i18next = require('i18next');
const Backend = require('i18next-node-fs-backend');
const i18nextMiddleware = require('i18next-express-middleware');



const app = express();

// initial 2 language
i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        backend: {
            loadPath: __dirname + '/resources/locales/{{lng}}/{{ns}}.json'
        },
        fallbackLng: 'id', // default language
        preload: ['id', 'en'] // language mode 
    });

app.use(i18nextMiddleware.handle(i18next));


const {PORT} = process.env;

// Router 
const loginRouters = require('./routers/login');
const itemsRouters = require('./routers/MasterItems'); // Master Items
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
const printRouters = require('./routers/print');


global.__basedir = __dirname + "/..";


// create a Server
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/// Swagger // 
const swaggerUi = require('swagger-ui-express');
const apiDocumenttation = require('./doc/swagger.json');


// call router
app.use('/api/v1/login',loginRouters);
app.use('/api/v1', itemsRouters);
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
app.use('/api/v1/print',printRouters);
// Swagger Router
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumenttation));

//var router = require('./router');
//router(app);


const cron =require('./Scheduller/scheduller');
// app.use(cron);


app.listen(PORT, () => {
    console.log(`Server started on port:`, PORT);
});
