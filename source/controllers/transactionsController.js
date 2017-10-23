/**
 * Created by Natalia on 27.09.2017.
 */

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

}
module.exports = transactionsController;
