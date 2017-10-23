/**
 * Created by Natalia on 23.10.2017.
 */
const logger = require('./../../libs/logger.js')('wallet-app');
const db = require('./db');
const mongoose = require('mongoose');

class common extends db {
	constructor(){
		super();
	}
	async generateId(){
		if(this.db === false){
			await this.connect();
		}
		let list = await this.getList();
		let id = list[list.length -1].id;
		return ++id;
	}
	async getList(){
		if(this.db === false){
			await this.connect();
		}
		let list = await new Promise((resolve, reject) => {
			this.model.find((err, info) => {
				if(err){
					logger.log('dev', err);
					reject(err);
				}
				resolve(info);
			});
		});
		return list;
	}
	async getOne(id){
		if(this.db === false){
			await this.connect();
		}
		let one = await new Promise((resolve, reject) => {
			this.model.findOne({id: id}, (err, info) => {
				if(err){
					logger.log('dev', err);
					reject(err);
				}
				resolve(info);
			});
		});
		return one;
	}
	async addOne(data){
		if(this.db === false){
			await this.connect();
		}
		data.id = await this.generateId();
		let addData = await new Promise((resolve, reject) => {
			this.model.create(data,(err, info) => {
				if(err){
					logger.log('dev', 'Card not added');
					reject(err);
				}
				logger.log('dev', 'One card added');

				resolve(info);
			});
		});
		return addData;
	}
}
module.exports = common;