/**
 * Created by Natalia on 20.10.2017.
 */
const MongoClient = require('mongodb').MongoClient;
const logger = require('./../../libs/logger.js')('wallet-app');
const mongoose = require('mongoose');

class db {
	constructor(){
		this.db = false;
	}
	async connect() {
		this.db = await new Promise((resolve, reject) => {
			mongoose.connect('mongodb://localhost:27017/wallet',{useMongoClient: true}, (err, db) => {
				if (err) {
					logger.log('dev', 'Error db connecting');
					reject(err);
				}
				resolve(db);
			});
		});
	}
}
module.exports = db;