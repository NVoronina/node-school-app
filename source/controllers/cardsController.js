/**
 * Created by Natalia on 27.09.2017.
 */

class cardsController {
    constructor(){
        let cardsModel =  require('./../models/cardsModel');
        this.Model = new cardsModel();
        this.list = false;
    }
    async getCardsList(ctx) {
        this.list = await this.Model.getList();
        return ctx.body = this.list;
    }
	async createPay(ctx){
		let cardId = Number(ctx.params['id']);
		let data = ctx.request.body;
        let check = await this.Model.updateBalance(cardId, data.amount);
        if (data.type === "withdrawCard" || data.type === "prepaidCard"){
            //Прибавляем к балансу карты, где переводы на карту
            let cardsModel = require('../models/cardsModel');
            let cards = new cardsModel();
            console.log(data.data);
            let id = cards.getOne(data.data);
	        let sum = -data.amount;
	        check = await this.Model.updateBalance(Number(data.data), sum);
	        ctx.request.body.data = check.cardNumber;
        }
        return true;
	}
    async addNewCard(ctx) {
        let data = ctx.request.body;
        let cardData = await this.validateCard(data);
	    if(cardData !== false){
	        console.log(cardData);
            let card = await this.Model.addOne(cardData);
            ctx.status = 201;
            ctx.body = card;
        } else {
            ctx.status = 404;
            ctx.body = 'Something wrong';

        }
        return ctx;
    }
    async deleteOneCard(ctx) {
        let id = Number(ctx.params['id']);
        if(id){
            let check = await this.Model.deleteOne(id);
            if(check !==false){
                ctx.body = 'The card was deleted';
                ctx.status = 200;
            } else {
                ctx.body = 'Some goes wrong';
                ctx.status = 404;
            }
        }

        return ctx;
    }
    validateCard(info) {
        let check = {};
        if(info.cardNumber.match(/^[0-9]{16}$/)){
            check['cardNumber'] = info.cardNumber;
        } else {
            return false;
        }
        if(info.balance.match(/[0-9]/)){
            check['balance'] = info.balance;
        } else {
            return false;
        }
        return check;
    }

}
module.exports = cardsController;
