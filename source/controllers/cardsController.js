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
        return ctx.body = this.generatePage();
    }
    async addNewCard(ctx) {
        let data = ctx.request.body;
        let validateStatus = await this.validateCard(data);
        if(validateStatus !== false){
            this.list = await this.Model.addOne(data);
            ctx.status = 201;
            ctx.body = 'Added';
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
        console.log(info);
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
    generatePage(){
        let list = '<ul>';
        for(let card of this.list){
            list += `<li>
					<div>
						<p>Card Number: ${card.cardNumber}</p>
						<p>Card Balance: ${card.balance}</p>
					</div>
				</li>`;
        }
        list += '</ul>' +
            '<form method="post" action="/cards/">' +
            'Номер карты<input type="text" name="cardNumber" />' +
            'Баланс<input type="text" name="balance" />' +
            '<input type="submit">' +
            '</form>';
        return list;
    }

}
module.exports = cardsController;
