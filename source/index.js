/**
 * Created by Natalia on 27.09.2017.
 */
const koa = require('koa');
const app = new koa();
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser')();
const Router = require('koa-router');
const router = new Router();
const cardsController = require('./controllers/cardsController');
const transactionsController = require('./controllers/transactionsController');
const controllerCards = new cardsController();
const controllerTransactions = new transactionsController();
const fs = require('fs');

// Сохраним параметр id в ctx.params.id
router.param('id', (id, ctx, next) => next());
app.use(bodyParser);
//  main page
router.get('/', function (ctx)  {
	ctx.body = fs.readFileSync('../public/index.html', 'utf8');
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
router.get('/cards/:id/transactions/', async function(ctx){
    await controllerTransactions.getAllCardTransactions(ctx);
});
router.post('/cards/:id/transactions/', async function(ctx){
    await controllerTransactions.createTransaction(ctx);
});

app.use(router.routes());

// logger
app.use(async function(ctx, next) {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// error handler
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log('Error detected', err);
        ctx.status = err instanceof ApplicationError ? err.status : 500;
        ctx.body = `Error [${err.message}] :(`;
    }

});
app.use(serve('../public'));

app.listen(3000, () => {
    console.log('Application started');
});
