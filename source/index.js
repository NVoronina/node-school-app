/**
 * Created by Natalia on 27.09.2017.
 */
const koa = require('koa');
const path = require('path');
const app = new koa();
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser')();
const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const http = require('http');
//const https = require('https');
var db;
const MongoClient = require('mongodb').MongoClient;
const options = {
	key: fs.readFileSync('./configs/key.pem'),
	cert: fs.readFileSync('./configs/cert.pem'),
};
//logger
//joy validation
//db sequelize
const logger = require('../libs/logger.js')('wallet-app');

const {renderToStaticMarkup} = require('react-dom/server');
const cardsController = require('./controllers/cardsController');
const transactionsController = require('./controllers/transactionsController');
const controllerCards = new cardsController();
const controllerTransactions = new transactionsController();

const DATA = {
	user: {
		login: 'samuel_johnson',
		name: 'Samuel Johnson'
	}
};

function getView(viewId) {
	const viewPath = path.resolve(__dirname, 'views', `${viewId}.server.js`);
	return require(viewPath);
}
// Сохраним параметр id в ctx.params.id
router.param('id', (id, ctx, next) => next());
app.use(bodyParser);
//  main page
router.get('/', function (ctx)  {
	const indexView = getView('index');
	const indexViewHtml = renderToStaticMarkup(indexView(DATA));
	ctx.body = indexViewHtml;

});

// cards
router.get('/cards/', async function(ctx){
    await controllerCards.getCardsList(ctx);
});
router.post('/cards/', async function(ctx){
    await controllerCards.addNewCard(ctx);
});

router.get('/delete/:id', async function(ctx){
    await controllerCards.deleteOneCard(ctx);
});
// transactions
router.get('/transactions/', async function(ctx) {
	await controllerTransactions.getAllTransactions(ctx);
});
router.get('/cards/:id/transactions/', async function(ctx){
    await controllerTransactions.getAllCardTransactions(ctx);
});
router.post('/cards/:id/transactions/', async function(ctx){
    await controllerTransactions.createTransaction(ctx);
});
// pay
router.post('/cards/:id/pay/', async function(ctx){
	let updateBalance = await controllerCards.createPay(ctx);
	if (updateBalance === true) {
		logger.log('dev', 'transactions go');
		await controllerTransactions.createTransaction(ctx);
	}
	return ctx;
});
app.use(router.routes());

// logger
app.use(async function(ctx, next) {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    //logger.log('info', `${ctx.method} ${ctx.url} - ${ms}ms`);
});

// error handler
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        logger.log('dev', 'Error detected', err);
        ctx.status = err instanceof ApplicationError ? err.status : 500;
        ctx.body = `Error [${err.message}] :(`;
    }

});
app.use(serve('../public'));

http.createServer(app.callback()).listen(3000, () => {
	logger.log('Application started on port 3000');
});
// https.createServer(options, app.callback()).listen(443, () => {
// 	logger.log('Application started on port 443');
// });
