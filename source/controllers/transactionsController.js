/**
 * Created by Natalia on 27.09.2017.
 */

class transactionsController {
    constructor(){
        const transactionsModel =  require('./../models/transactionsModel');
        this.Model = new transactionsModel();
        this.list = false;
	    const allowedTypes = ['prepaidCard', 'paymentMobile', 'card2Card'];
    }
    async getAllCardTransactions(ctx){
        let cardId = Number(ctx.params['id']);
        let data = await this.Model.get(cardId);
        return ctx.body = await this.generatePage(data);
    }

    async createTransaction(ctx){
        let cardId = Number(ctx.params['id']);
        let cardsModel = await require('./../models/cardsModel');
        let cards = new cardsModel();
        let cardInfo = await cards.getOne(cardId);
        let time = (new Date()).toISOString();
        let data = {
            "id":0,
	        "cardId": cardId,
	        "type": String(ctx.request.body.type),
	        "data": String(ctx.request.body.data),
	        "time": time,
	        "sum": String(ctx.request.body.amount)
        };
        let create = await this.Model.create(data);
        return ctx.body = "все ok";
    }

}
module.exports = transactionsController;
