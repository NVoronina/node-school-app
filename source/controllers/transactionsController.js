/**
 * Created by Natalia on 27.09.2017.
 */

class transactionsController {
    constructor(){
        let transactionsModel =  require('./../models/transactionsModel');
        this.Model = new transactionsModel();
        this.list = false;
    }
    async getAllCardTransactions(ctx){
        let cardId = Number(ctx.params['id']);
        let data = await this.Model.get(cardId);
        return ctx.body = await this.generatePage(data);
    }

    async createTransaction(ctx){
        let cardId = Number(ctx.params['id']);
        let data = await this.Model.create({"id": 3,
            "cardId": 1,
            "type": "prepaidCard",
            "data": "220003000000003",
            "time": "2017-08-9T05:28:31+03:00",
            "sum": "4000"});

        return ctx.body = "dct ok";
    }
    generatePage(info){
        let list = '<ul>';
        for(let transaction of info){
            list += `<li>
					<div>
						<p>id: ${transaction.id}</p>
						<p>cardId: ${transaction.cardId}</p>
						<p>type: ${transaction.type}</p>
						<p>data: ${transaction.data}</p>
						<p>time: ${transaction.time}</p>
						<p>sum: ${transaction.sum}</p>
					</div>
				</li>`;
        }
        list += '</ul>' +
            '<form method="post" action="/cards/2/transactions/">' +
            'Сумма<input type="text" name="sum" />' +
            '<input type="submit">' +
            '</form>';
        return list;
    }

}
module.exports = transactionsController;
