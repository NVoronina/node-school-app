/**
 * Created by Natalia on 27.09.2017.
 */
const path = require('path');
const fs = require('fs');
const logger = require('./../../libs/logger.js')('wallet-app');

class cardsModel {
    constructor(){
        this.fileDir = path.join(__dirname, '..', '..',  'source/data', 'cards.json');
        this.jsonFile = false;
    }
    async loadFile(){
	    if(this.jsonFile === false) {
		    this.jsonFile = await new Promise((resolve, reject) => {
			    fs.readFile(this.fileDir, (err, data) => {
				    if (err) {
					    reject(err);
					    return false;
				    }
				    resolve(JSON.parse(data));
			    })
		    });
	    }
	    return this.jsonFile;
    }
    async getList(){
        let data = await this.loadFile();
        if(data !== false) {
	        return this.jsonFile;
        } else {
        	return false;
        }
    }
	async getOne(cardId){
		await this.loadFile();
		for(let card of this.jsonFile){
			if(Number(card.id) === Number(cardId)){
				let data = card;
				return data;
			}
		}
		return false;
	}
    async addOne(data){
	    await this.loadFile();
        this.jsonFile.push(data);
	    await fs.writeFile(this.fileDir, JSON.stringify(this.jsonFile),(err) => {
		    if (err) {
			    logger.log('dev', 'Card not added');
			    return false;
		    }else {
			    logger.log('dev', 'One card added');
			    return true;
			}
	    });
    }

    async deleteOne(id){
        await this.loadFile();
        let check = this.getOne(id);
        if(check !== false) {
        	for(let key in this.jsonFile){
        		if(Number(this.jsonFile[key].id) === Number(id)){
			        this.jsonFile.splice(key, 1);
		        }
	        }
            await fs.writeFile(this.fileDir, JSON.stringify(this.jsonFile, "", 2),(err) => {
	            if (err) {
		            logger.log('dev', 'Card not deleted');
		            return false;
	            }else {
		            logger.log('dev', 'One card delete');
		            return true;
	            }
            });
        }else {
            return false;
        }
    }
    async updateBalance(id, sum){
	    this.jsonFile = await this.loadFile();
	    const cardData = await this.getOne(id);
	    if(cardData !== false) {
	    	for(let card of this.jsonFile){
	    		if(Number(card.id) === Number(id) ){
				    let amount = 0;
				    amount = card["balance"] - sum;
				    card.balance = amount;
				    await fs.writeFile(this.fileDir, JSON.stringify(this.jsonFile, "", 2),(err) => {
					    if (err) logger.log('dev', 'card balance not updated');
					    logger.log('dev', 'card balance updated');
				    });
				    return cardData;
			    }
		    }
	    }else {
		    return false;
	    }
    }

}
module.exports = cardsModel;