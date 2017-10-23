/**
 * Created by Natalia on 28.09.2017.
 */
const logger = require('./../../libs/logger.js')('wallet-app');
const db = require('./db');
const mongoose = require('mongoose');
const common = require('./common');

class transactionsModel extends common{
	constructor(){
		super();
		let schema = mongoose.Schema({
			id: {type: Number, unique: true},
			cardId: Number,
			type: String,
			data: String,
			time: String,
			sum: String
		});
		this.model = mongoose.model("transactions", schema);
	}
	async getAllCardsTransaction(id){
		if(this.db === false){
			await this.connect();
		}
		let list = await new Promise((resolve, reject) => {
			this.model.find({cardId: id}, (err, info) => {
				if(err){
					logger.log('dev', err);
					reject(err);
				}
				resolve(info);
			});
		});
		return list;
	}
	remove(){
		logger.log('dev', 'Попытка удаления транзакции');
		throw new Error("You can't remove transactions");
	}

}
module.exports = transactionsModel;