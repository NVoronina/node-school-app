/**
 * Created by Natalia on 27.09.2017.
 */
const streamController = require('./streamController');
const fs = require('fs');

class transactionsController {
    constructor(){
	    let transactionsModel =  require('./../models/transactionsModel');
        this.Model = new transactionsModel();
        this.list = false;
	    let allowedTypes = ['prepaidCard', 'paymentMobile', 'card2Card'];
    }
    async getAllTransactions(ctx){
    	let data = await this.Model.getList();
    	console.log(data);
    	ctx.body = data;
    	ctx.status = 200;
    	return ctx;
    }
    async getAllCardTransactions(ctx){
        let cardId = Number(ctx.params['id']);
        let data = await this.Model.getAllCardsTransaction(cardId);
        return ctx.body = data;
    }

    async createTransaction(ctx){
        let cardId = Number(ctx.params['id']);
        let time = (new Date()).toISOString();
        let data = {
	        "cardId": cardId,
	        "type": String(ctx.request.body.type),
	        "data": String(ctx.request.body.data),
	        "time": time,
	        "sum": String(ctx.request.body.amount)
        };
        let create = await this.Model.addOne(data);
	    ctx.body = create;
	    ctx.status = 200;
        return ctx;
    }

    async getCardsTransactionCsv(ctx){
	    let cardId = Number(ctx.params['id']);
	    let info = await this.Model.getAllCardsTransaction(cardId);
	    const stream = new streamController();
	    let itog = '';
	    for(let transaction of info){
		    stream.write(`${transaction.id},${transaction.cardId},${transaction.type},${transaction.data},${transaction.time},${transaction.sum}`);
	    }
	    ctx.body = 'hello';
	    //stream.pipe(ctx.body);
	    /*let itog = '';
	    stream.pipe(process.stdout);
	    stream.pipe(itog);*/
	    //streamController.prototype.pipe.end();// = () => {};
	    //streamController.prototype.pipe = () => {};
	    //.body = itog;
	    //ctx.type = "application/CSV";
	    //ctx.type = "attachment;filename=myfilename.csv";
		return ctx;
    }

}
module.exports = transactionsController;
