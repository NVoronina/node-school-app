/**
 * Created by Natalia on 27.09.2017.
 */
const logger = require('./../../libs/logger.js')('wallet-app');
const db = require('./db');
const mongoose = require('mongoose');
const common = require('./common');

class cardsModel extends common{
    constructor(){
    	super();
	    let schema = mongoose.Schema({
		    id: {type: Number,unique: true},
		    cardNumber: String,
		    balance: Number
	    });
	    this.model = mongoose.model("cards", schema);

    }

    async deleteOne(id){
	    if(this.db === false){
		    await this.connect();
	    }
	    let check = await this.getOne(id);
        if(check) {
	        await this.model.findOneAndRemove({_id:check._id});
			return true;
        }else {
            return false;
        }
    }
    async updateBalance(id, sum){
	    if(this.db === false){
		    await this.connect();
	    }
	    let cardData = await this.getOne(id);
	    if(cardData !== false) {
		    cardData.balance = cardData.balance - sum;
		    let updatedCard = await new Promise((resolve, reject) => {
			    this.model.where({_id: cardData._id}).update(cardData, (err, info) => {
				    if(err){
					    logger.log('dev', 'Card not added');
					    reject(err);
				    }
				    logger.log('dev', 'One card added');
				    resolve(info);
			    });
		    });
		    return updatedCard;
	    }else {
		    return false;
	    }
    }

}
module.exports = cardsModel;