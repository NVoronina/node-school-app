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
// Сохраним параметр id в ctx.params.id
router.param('id', (id, ctx, next) => next());
app.use(bodyParser);

// cards
router.get('/cards/', async function(ctx){
    const controllerCards = new cardsController();
    await controllerCards.getCardsList(ctx);
});
router.post('/cards/', async function(ctx){
    const controllerCards = new cardsController();
    await controllerCards.addNewCard(ctx);
});

router.get('/delete/:id', async function(ctx){
    const controllerCards = new cardsController();
    await controllerCards.deleteOneCard(ctx);
});
// transactions
router.get('/cards/:id/transactions/', async function(ctx){
    const controllerTransactions = new transactionsController();
    await controllerTransactions.getAllCardTransactions(ctx);
});
router.post('/cards/:id/transactions/', async function(ctx){
    const controllerTransactions = new transactionsController();
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


app.listen(3000, () => {
    console.log('Application started');
});
